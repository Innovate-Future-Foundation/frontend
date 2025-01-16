provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = var.default_tags
  }
}

provider "aws" {
  alias  = "route53"
  region = var.aws_region
  
  default_tags {
    tags = var.default_tags
  }
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
  
  default_tags {
    tags = var.default_tags
  }
}

locals {
  s3_domain_name = "${var.frontend_s3_bucket}.s3.${var.aws_region}.amazonaws.com"
}

module "jenkins" {
  source = "../../modules/jenkins"

  providers = {
    aws         = aws
    aws.route53 = aws.route53
  }

  vpc_id             = var.vpc_id
  subnet_id          = var.subnet_id
  key_name           = var.key_name
  create_dns_record  = true
  domain_name        = var.domain_name
  create_certificate = true
  environment        = var.environment
  tags              = var.default_tags
}

module "acm" {
  source = "../../modules/acm"
  
  providers = {
    aws = aws.us_east_1
  }
  
  domain_name  = var.domain_name
  environment  = var.environment
  tags         = var.default_tags
}

module "cloudfront" {
  source = "../../modules/cloudfront"
  
  providers = {
    aws = aws.us_east_1
  }
  
  project_name            = var.project_name
  environment            = var.environment
  s3_bucket_domain_name  = local.s3_domain_name
  domain_names           = [var.domain_name]
  acm_certificate_arn    = module.acm.certificate_arn
  tags                   = var.default_tags
}

module "frontend_config" {
  source = "../../modules/frontend-config"
  
  environment                = var.environment
  s3_bucket_name            = var.frontend_s3_bucket
  cloudfront_distribution_id = module.cloudfront.distribution_id
  aws_region                = var.aws_region
  tags                      = var.default_tags
}