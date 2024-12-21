locals {
  s3_origin_id   = "${var.s3_name}-origin"
  s3_domain_name = "${var.s3_name}.s3-website-${var.region}.amazonaws.com"
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "frontend_distribution" {
  origin {
    origin_id   = local.s3_origin_id
    domain_name = local.s3_domain_name
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
    # origin_access_control_id = aws_cloudfront_origin_access_control.frontend_bucket_oac.id
  }

  enabled             = true
  is_ipv6_enabled     = false
  default_root_object = "index.html"

  # Default Cache Behavior
  default_cache_behavior {
    target_origin_id = local.s3_origin_id
    allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods   = ["GET", "HEAD"]

    viewer_protocol_policy = "allow-all" # Enable HTTP and HTTPS
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    cache_policy_id          = "658327ea-f89d-4fab-a63d-7e88639e58f6" # Recommended AWS Managed Cache Policy
    compress                 = true                                   # Compress objects automatically
    origin_request_policy_id = "b689b0a8-53d0-40ab-baf2-68738e2966ac" # Recommended AWS Managed Origin Request Policy
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none" # No restrictions applied
    }
  }

  # Tags
  tags = {
    Project     = "inff"
    Envorinment = "dev"
  }
}
# resource "aws_cloudfront_origin_access_control" "frontend_bucket_oac" {
#   name                              = "frontend-bucket-oac"
#   description                       = "Origin Access Control for S3 Bucket frontend-bucket"
#   origin_access_control_origin_type = "s3"
#   signing_behavior                  = "always"
#   signing_protocol                  = "sigv4"
# }

# CloudFront Origin Access Identity (OAI)
# resource "aws_cloudfront_origin_access_identity" "frontend_oa_identity" {
#   id      = "E74FTE3AEXAMPLE"
#   comment = "Access Identity for S3 Bucket frontend-bucket"
# }

# import {
#   to = aws_cloudfront_origin_access_identity.frontend_oa_identity
#   id = "E74FTE3AEXAMPLE"
# }

output "cloudfront_url" {
  value = {
    arn         = aws_cloudfront_distribution.frontend_distribution.arn
    domain_name = aws_cloudfront_distribution.frontend_distribution.domain_name

  }
  description = "The CloudFront information for accessing the frontend."
}
