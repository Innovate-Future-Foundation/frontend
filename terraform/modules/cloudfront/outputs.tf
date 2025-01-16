output "distribution_id" {
  value       = aws_cloudfront_distribution.frontend.id
  description = "CloudFront distribution ID"
}

output "distribution_domain_name" {
  value       = aws_cloudfront_distribution.frontend.domain_name
  description = "CloudFront distribution domain name"
}

output "origin_access_identity_arn" {
  value       = aws_cloudfront_origin_access_identity.frontend.iam_arn
  description = "ARN of the CloudFront Origin Access Identity"
}

output "origin_access_identity_path" {
  value       = aws_cloudfront_origin_access_identity.frontend.cloudfront_access_identity_path
  description = "Path of the CloudFront Origin Access Identity"
}

output "ssm_parameter_name" {
  value       = aws_ssm_parameter.cloudfront_dist_id.name
  description = "SSM parameter name containing the CloudFront distribution ID"
}