provider "aws" {
  region = "ap-southeast-2"
}

module "jenkins" {
  source = "../../modules/jenkins"
  
  # 必需的变量
  vpc_id    = "vpc-02dc0530efaa84eca"  # 替换为你的 VPC ID
  subnet_id = "subnet-0e024c508d64d2215"  # 替换为你的子网 ID
  key_name  = "ds"  # 替换为你的 SSH 密钥名称
  
  # DNS 配置
  create_dns_record = true
  domain_name       = "innofa.click"
  route53_zone_id   = "Z054911218TP1OPWOJBBL"
  
  # HTTPS 配置
  create_certificate = true
  
  # 环境配置
  environment = "prod"
  
  tags = {
    Owner = "YourName"
    Team  = "DevOps"
  }
}