# terraform/modules/s3/variables.tf
variable "bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
}

variable "cloudfront_oai_arn" {
  description = "ARN of the CloudFront Origin Access Identity"
  type        = string
}

variable "tags" {
  description = "Tags to apply to the bucket"
  type        = map(string)
  default     = {}
}