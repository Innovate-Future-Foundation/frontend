# terraform/environments/prod/terraform.tfvars
project_name    = "innovate-future"
environment     = "prod"
aws_region      = "ap-southeast-2"
domain_name     = "innofa.click"

# Frontend configurations
frontend_s3_bucket = "if-devops-front-personal-test"

# Infrastructure configurations
vpc_id    = "vpc-02dc0530efaa84eca"
subnet_id = "subnet-0e024c508d64d2215"
key_name  = "ds"

# Tags
default_tags = {
  Owner       = "Dylan"
  Team        = "DevOps"
  Environment = "prod"
  ManagedBy   = "terraform"
}