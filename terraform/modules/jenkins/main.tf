# modules/jenkins/main.tf

provider "aws" {
  region = var.aws_region
}

# VPC相关资源使用已有的或创建新的

# Jenkins Master EC2
resource "aws_instance" "jenkins_master" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name

  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [aws_security_group.jenkins.id]
  associate_public_ip_address = true

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

  user_data = file("${path.module}/userdata.sh")

  tags = {
    Name = "jenkins-master"
  }
}

# Jenkins安全组
resource "aws_security_group" "jenkins" {
  name        = "jenkins-master-sg"
  description = "Security group for Jenkins master"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# IAM角色和实例配置文件
resource "aws_iam_role" "jenkins" {
  name = "jenkins-master-role"

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
}

# 添加必要的IAM策略
