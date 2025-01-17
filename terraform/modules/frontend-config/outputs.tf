output "ssm_parameters" {
  description = "Map of created SSM parameters"
  value = {
    for k, v in merge(
      aws_ssm_parameter.frontend_config,
      aws_ssm_parameter.frontend_aws_credentials
    ) : k => v.name
  }
  sensitive = true
}