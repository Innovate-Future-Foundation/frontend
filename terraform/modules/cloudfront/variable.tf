variable "project_name" {
  type        = string
  description = "Project name used for resource naming"
}

variable "environment" {
  type        = string
  description = "Environment name (e.g., dev, staging, prod)"
}

variable "s3_bucket_domain_name" {
  type        = string
  description = "Domain name of the S3 bucket"
}

variable "domain_names" {
  type        = list(string)
  description = "List of domain names for the CloudFront distribution"
  default     = []
}

variable "price_class" {
  type        = string
  description = "CloudFront distribution price class"
  default     = "PriceClass_100"
}

variable "acm_certificate_arn" {
  type        = string
  description = "ARN of ACM certificate for custom domain"
}

variable "cache_min_ttl" {
  type        = number
  description = "Minimum TTL for cached objects"
  default     = 0
}

variable "cache_default_ttl" {
  type        = number
  description = "Default TTL for cached objects"
  default     = 3600
}

variable "cache_max_ttl" {
  type        = number
  description = "Maximum TTL for cached objects"
  default     = 86400
}

variable "tags" {
  type        = map(string)
  description = "Tags to be applied to all resources"
  default     = {}
}