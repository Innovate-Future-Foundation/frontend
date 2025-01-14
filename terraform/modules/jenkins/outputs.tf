output "jenkins_instance_id" {
  description = "ID of the Jenkins EC2 instance"
  value       = aws_instance.jenkins_master.id
}

output "jenkins_public_ip" {
  description = "Public IP of Jenkins instance"
  value       = aws_instance.jenkins_master.public_ip
}

output "jenkins_private_ip" {
  description = "Private IP of Jenkins instance"
  value       = aws_instance.jenkins_master.private_ip
}

output "jenkins_security_group_id" {
  description = "ID of Jenkins security group"
  value       = aws_security_group.jenkins.id
}

output "jenkins_role_arn" {
  description = "ARN of Jenkins IAM role"
  value       = aws_iam_role.jenkins.arn
}

output "jenkins_url" {
  description = "URL of Jenkins server"
  value       = var.create_dns_record ? "https://jenkins.${var.domain_name}" : "http://${aws_instance.jenkins_master.public_ip}:8080"
}

output "certificate_arn" {
  description = "ARN of the ACM certificate"
  value       = var.create_certificate ? aws_acm_certificate.jenkins[0].arn : null
}

output "configuration_check" {
  description = "Configuration validation summary"
  value = {
    vpc_configured      = var.vpc_id != ""
    subnet_configured   = var.subnet_id != ""
    key_pair_configured = var.key_name != ""
    dns_enabled        = var.create_dns_record
    https_enabled      = var.create_certificate
    domain_configured  = var.create_dns_record ? "jenkins.${var.domain_name}" : null
  }
}