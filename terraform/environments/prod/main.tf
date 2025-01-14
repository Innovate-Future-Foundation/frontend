provider "aws" {
  region = "ap-southeast-2"
}

provider "aws" {
  alias  = "route53"
  region = "ap-southeast-2"
}

module "jenkins" {
  source = "../../modules/jenkins"

  providers = {
    aws         = aws
    aws.route53 = aws.route53
  }

  # 必需的变量
  vpc_id    = "vpc-02dc0530efaa84eca"
  subnet_id = "subnet-0e024c508d64d2215"
  key_name  = "ds"

  # DNS 配置
  create_dns_record = true
  domain_name       = "innofa.click"

  # HTTPS 配置
  create_certificate = true

  # 环境配置
  environment = "prod"

  tags = {
    Owner = "Dylan"
    Team  = "DevOps"
  }
}
