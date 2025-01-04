output "cloudfront_url" {
  value = {
    arn         = aws_cloudfront_distribution.this.arn
    domain_name = aws_cloudfront_distribution.this.domain_name

  }
  description = "The CloudFront information for accessing the frontend."
}

output "s3_bucket_deployment_info" {
  value = {
    arn         = aws_s3_bucket.this.arn
    bucket_name = aws_s3_bucket.this.bucket
    region      = aws_s3_bucket.this.region
  }
  description = "S3 bucket information for deploying the frontend code."
}
