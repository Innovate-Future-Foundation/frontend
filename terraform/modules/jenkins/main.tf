# 获取当前 IP 地址
data "http" "current_ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  ansible_controller_ip = chomp(data.http.current_ip.response_body)
}

# Jenkins Master EC2
resource "aws_instance" "jenkins_master" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name

  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [aws_security_group.jenkins.id]
  associate_public_ip_address = true
  iam_instance_profile        = aws_iam_instance_profile.jenkins.name

  root_block_device {
    volume_size = local.storage_config[var.environment].root_volume.size
    volume_type = "gp3"
    iops        = local.storage_config[var.environment].root_volume.iops
    throughput  = local.storage_config[var.environment].root_volume.throughput
    encrypted   = true
    tags        = local.common_tags
  }

  ebs_block_device {
    device_name = "/dev/sdf"
    volume_size = local.storage_config[var.environment].data_volume.size
    volume_type = "gp3"
    iops        = local.storage_config[var.environment].data_volume.iops
    throughput  = local.storage_config[var.environment].data_volume.throughput
    encrypted   = true
    tags        = local.common_tags
  }

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-master",
      Role = "jenkins-master",
      Component = "ci-cd",
      Service = "jenkins"
    }
  )
}

# Application Load Balancer
resource "aws_lb" "jenkins" {
  name               = "${local.name_prefix}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.jenkins_alb.id]
  subnets            = var.public_subnet_ids

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-alb"
    }
  )
}

resource "aws_lb_target_group" "jenkins" {
  name     = "${local.name_prefix}-tg"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = var.vpc_id
  
  health_check {
    path                = "/login"
    healthy_threshold   = 2
    unhealthy_threshold = 10
    timeout             = 5
    interval            = 30
    matcher            = "200,302"
  }

  tags = local.common_tags
}

resource "aws_lb_target_group_attachment" "jenkins" {
  target_group_arn = aws_lb_target_group.jenkins.arn
  target_id        = aws_instance.jenkins_master.id
  port             = 8080
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.jenkins.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# ACM Certificate
resource "aws_acm_certificate" "jenkins" {
  count    = var.create_certificate ? 1 : 0

  domain_name       = "jenkins.${var.domain_name}"
  validation_method = "DNS"

  tags = local.common_tags

  lifecycle {
    create_before_destroy = true
  }
}

# 添加证书验证记录
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.jenkins[0].domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.selected.zone_id
}

# 等待证书验证完成
resource "aws_acm_certificate_validation" "jenkins" {
  count                   = var.create_certificate ? 1 : 0
  certificate_arn         = aws_acm_certificate.jenkins[0].arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.jenkins.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate.jenkins[0].arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.jenkins.arn
  }

  depends_on = [aws_acm_certificate_validation.jenkins]
}

# ALB Security Group
resource "aws_security_group" "jenkins_alb" {
  name_prefix = "${local.name_prefix}-alb-sg"
  description = "Security group for Jenkins ALB"
  vpc_id      = var.vpc_id

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-alb-sg"
    }
  )
}

resource "aws_security_group_rule" "alb_http_ingress" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.jenkins_alb.id
  description       = "Allow HTTP access from internet"
}

resource "aws_security_group_rule" "alb_https_ingress" {
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.jenkins_alb.id
  description       = "Allow HTTPS access from internet"
}

resource "aws_security_group_rule" "alb_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.jenkins_alb.id
  description       = "Allow all outbound traffic"
}

# Jenkins Security Group
resource "aws_security_group" "jenkins" {
  name_prefix = "${local.name_prefix}-sg"
  description = "Security group for Jenkins master"
  vpc_id      = var.vpc_id

  tags = local.common_tags
}

resource "aws_security_group_rule" "jenkins_ssh" {
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  cidr_blocks       = ["${local.ansible_controller_ip}/32"]
  security_group_id = aws_security_group.jenkins.id
  description       = "Allow SSH access from Ansible controller"
}

resource "aws_security_group_rule" "jenkins_ansible_access" {
  type              = "ingress"
  from_port         = 8080
  to_port           = 8080
  protocol          = "tcp"
  cidr_blocks       = ["${local.ansible_controller_ip}/32"]
  security_group_id = aws_security_group.jenkins.id
  description       = "Allow Jenkins access from Ansible controller"
}

resource "aws_security_group_rule" "jenkins_alb_access" {
  type                     = "ingress"
  from_port                = 8080
  to_port                  = 8080
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.jenkins_alb.id
  security_group_id        = aws_security_group.jenkins.id
  description             = "Allow access from ALB"
}

resource "aws_security_group_rule" "jenkins_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.jenkins.id
  description       = "Allow all outbound traffic"
}

# 使用域名查找 Hosted Zone
data "aws_route53_zone" "selected" {
  provider     = aws.route53
  name         = var.domain_name
  private_zone = false
}

# Route 53 Record
resource "aws_route53_record" "jenkins" {
  count    = var.create_dns_record ? 1 : 0
  provider = aws.route53

  zone_id = data.aws_route53_zone.selected.zone_id
  name    = "jenkins.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_lb.jenkins.dns_name
    zone_id                = aws_lb.jenkins.zone_id
    evaluate_target_health = true
  }
}

# IAM Role and Instance Profile
resource "aws_iam_role" "jenkins" {
  name = "${local.name_prefix}-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = local.common_tags
}