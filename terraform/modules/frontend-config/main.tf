
resource "aws_ssm_parameter" "frontend_config" {
  for_each = {
    s3_bucket               = "/frontend/${var.environment}/s3_bucket_name"
    cloudfront_distribution = "/frontend/${var.environment}/cloudfront_distribution_id"
    aws_region             = "/frontend/${var.environment}/aws_region"
    node_version           = "/frontend/${var.environment}/node_version"
    build_memory           = "/frontend/${var.environment}/build_memory"
  }

  name        = each.value
  type        = "String"
  value       = lookup(local.parameter_values, each.key)
  description = "Frontend configuration parameter for ${var.environment}"
  tier        = "Standard"
  
  tags = merge(
    var.tags,
    {
      Environment = var.environment
      Service     = "frontend"
      ManagedBy   = "terraform"
    }
  )
}

locals {
  parameter_values = {
    s3_bucket               = var.s3_bucket_name
    cloudfront_distribution = var.cloudfront_distribution_id
    aws_region             = var.aws_region
    node_version           = "Node18"
    build_memory           = "4096"
  }
}