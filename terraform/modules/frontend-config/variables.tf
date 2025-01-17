variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
}

variable "s3_bucket_name" {
  description = "Name of the S3 bucket for frontend deployment"
  type        = string
}

variable "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-2"
}

variable "tags" {
  description = "Additional tags for the parameters"
  type        = map(string)
  default     = {}
}

variable "aws_access_key_id" {
  description = "AWS Access Key ID for frontend deployment"
  type        = string
  sensitive   = true
}

variable "aws_secret_access_key" {
  description = "AWS Secret Access Key for frontend deployment"
  type        = string
  sensitive   = true
}