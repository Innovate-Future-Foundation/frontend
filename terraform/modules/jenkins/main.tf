provider "aws" {
  region = var.aws_region
}

provider "aws" {
  alias  = "route53"
  region = "ap-southeast-2"  # Route53 是全球服务，任何区域都可以
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

  user_data = templatefile("${path.module}/templates/userdata.sh.tpl", {
  domain_name = var.create_dns_record ? "jenkins.${var.domain_name}" : ""
})

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-master"
    }
  )
}

# Security Group
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
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.jenkins.id
}

resource "aws_security_group_rule" "jenkins_http" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.jenkins.id
}

resource "aws_security_group_rule" "jenkins_https" {
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.jenkins.id
}

resource "aws_security_group_rule" "jenkins_app" {
  type              = "ingress"
  from_port         = 8080
  to_port           = 8080
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.jenkins.id
}

resource "aws_security_group_rule" "jenkins_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.jenkins.id
}

# Route 53 Record
resource "aws_route53_record" "jenkins" {
  count = var.create_dns_record ? 1 : 0

  provider = aws.route53
  zone_id = var.route53_zone_id
  name    = "jenkins.${var.domain_name}"
  type    = "A"
  ttl     = "300"
  records = [aws_instance.jenkins_master.public_ip]
}

# ACM Certificate
resource "aws_acm_certificate" "jenkins" {
  count = var.create_certificate ? 1 : 0

  domain_name       = "jenkins.${var.domain_name}"
  validation_method = "DNS"

  tags = local.common_tags

  lifecycle {
    create_before_destroy = true
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

# resource "aws_iam_instance_profile" "jenkins" {
#   name = "${local.name_prefix}-profile"
#   role = aws_iam_role.jenkins.name
# }
