
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