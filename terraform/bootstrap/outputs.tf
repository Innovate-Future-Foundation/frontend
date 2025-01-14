output "state_bucket_name" {
  description = "Name of the S3 bucket for Terraform state"
  value       = aws_s3_bucket.terraform_state.id
}

output "dynamo_db_table_name" {
  description = "Name of the DynamoDB table for state locking"
  value       = aws_dynamodb_table.terraform_lock.id
}

# output "iam_policy_arn" {
#   description = "ARN of the IAM policy for Terraform state management"
#   value       = aws_iam_policy.terraform_state.arn
# }

output "state_logs_bucket_name" {
  description = "Name of the S3 bucket for Terraform state logs"
  value       = aws_s3_bucket.terraform_state_logs.id
}