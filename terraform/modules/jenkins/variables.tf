variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-2"
}

variable "vpc_id" {
  description = "VPC ID where Jenkins will be deployed"
  type        = string
}

variable "subnet_id" {
  description = "Subnet ID where Jenkins will be deployed"
  type        = string
}

variable "ami_id" {
  description = "AMI ID for Jenkins instance"
  type        = string
  default     = "ami-0f903fb156f24adbf"  # Amazon Linux 2 AMI in ap-northeast-1
}

variable "instance_type" {
  description = "Instance type for Jenkins master"
  type        = string
  default     = "t3.medium"
}

variable "key_name" {
  description = "SSH key name for Jenkins instance"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g., prod, dev)"
  type        = string
  default     = "prod"
}

variable "tags" {
  description = "Additional tags for resources"
  type        = map(string)
  default     = {}
}