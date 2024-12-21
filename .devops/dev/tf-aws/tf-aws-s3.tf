# Create S3 Bucket
resource "aws_s3_bucket" "frontend_bucket" {
  bucket        = var.s3_name
  force_destroy = true

  # Tags
  tags = {
    Project     = "inff"
    Envorinment = "dev"
  }
}

# resource "aws_s3_bucket_lifecycle_configuration" "frontend_bucket_lifecycle" {
#   bucket = aws_s3_bucket.frontend_bucket.id
#   rule {
#     id     = "rule1"
#     status = "Enabled"

#   }
# }

# S3 Bucket Public Access Block
resource "aws_s3_bucket_public_access_block" "frontend_bucket_public_access_block" {
  bucket                  = aws_s3_bucket.frontend_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# S3 Bucket Encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "frontend_bucket_encryption" {
  bucket = aws_s3_bucket.frontend_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Enable static website hosting
resource "aws_s3_bucket_website_configuration" "frontend_bucket_website" {
  bucket = aws_s3_bucket.frontend_bucket.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# S3 Bucket Policy
resource "aws_s3_bucket_policy" "allow_access_from_public" {
  bucket = aws_s3_bucket.frontend_bucket.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "AllowPublicReadGetObject",
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.frontend_bucket.arn}/*"
      }
    ]
  })
}
# resource "aws_s3_bucket_policy" "allow_access_from_cloudfront" {
#   bucket = aws_s3_bucket.frontend_bucket.id
#   policy = data.aws_iam_policy_document.allow_access_from_cloudfront.json
# }

# data "aws_iam_policy_document" "allow_access_from_cloudfront" {
#   statement {
#     actions = [
#       "s3:GetObject"
#     ]

#     resources = [
#       "${aws_s3_bucket.frontend_bucket.arn}/*"
#     ]

#     principals {
#       type = "AWS"
#       identifiers = [
#         # aws_cloudfront_origin_access_identity.frontend_oa_identity.iam_arn
#         aws_cloudfront_distribution.frontend_distribution.id
#       ]
#     }
#   }
# }
# data "aws_iam_policy_document" "allow_access_from_public" {
#   statement {
#     actions = [
#       "s3:GetObject"
#     ]

#     resources = [
#       "${aws_s3_bucket.frontend_bucket.arn}/*"
#     ]

#     principals {
#       type = "*"
#       identifiers = [
#         "*"
#       ]
#     }
#   }
# }

# S3 Bucket Versioning (Explicitly disabled)
resource "aws_s3_bucket_versioning" "frontend_bucket_versioning" {
  bucket = aws_s3_bucket.frontend_bucket.id

  versioning_configuration {
    status = "Suspended"
  }
}

# Output
output "s3_bucket_deployment_info" {
  value = {
    arn         = aws_s3_bucket.frontend_bucket.arn
    bucket_name = aws_s3_bucket.frontend_bucket.bucket
    region      = aws_s3_bucket.frontend_bucket.region
  }
  description = "S3 bucket information for deploying the frontend code."
}
