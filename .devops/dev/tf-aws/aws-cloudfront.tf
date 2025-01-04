locals {
  s3_origin_id   = "${var.s3_name}-origin"
  s3_domain_name = aws_s3_bucket.this.bucket_regional_domain_name
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "this" {
  enabled = true

  origin {
    origin_id   = local.s3_origin_id
    domain_name = local.s3_domain_name
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
    }
  }

  aliases = ["inff-web.${var.domain}"]

  is_ipv6_enabled     = false
  default_root_object = "index.html"

  # Default Cache Behavior
  default_cache_behavior {
    target_origin_id = local.s3_origin_id
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]

    viewer_protocol_policy = "allow-all" # Enable HTTP and HTTPS
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    cache_policy_id          = "658327ea-f89d-4fab-a63d-7e88639e58f6" # Recommended AWS Managed Cache Policy
    compress                 = true                                   # Compress objects automatically
    origin_request_policy_id = "b689b0a8-53d0-40ab-baf2-68738e2966ac" # Recommended AWS Managed Origin Request Policy

    # forwarded_values {
    #   query_string = true
    #   cookies {
    #     forward = "none"
    #   }
    # }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none" # No restrictions applied
    }
  }

  viewer_certificate {
    # cloudfront_default_certificate = true
    acm_certificate_arn      = var.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  price_class = "PriceClass_200"

  # Tags
  tags = {
    Project     = "inff"
    Envorinment = "dev"
  }
}

# CloudFront Origin Access Identity (OAI)
resource "aws_cloudfront_origin_access_identity" "this" {
  comment = "Access Identity for S3 Bucket frontend-bucket"
}
