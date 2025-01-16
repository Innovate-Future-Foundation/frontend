output "ssm_parameters" {
  description = "Map of created SSM parameters"
  value = {
    for k, v in aws_ssm_parameter.frontend_config : k => v.name
  }
}