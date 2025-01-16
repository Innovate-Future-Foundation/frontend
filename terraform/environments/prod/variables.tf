# terraform/environments/prod/variables.tf

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
}

variable "frontend_s3_bucket" {
  description = "Name of the S3 bucket for frontend deployment"
  type        = string
}

variable "vpc_id" {
  description = "ID of the VPC"
  type        = string
  
  validation {
    condition     = can(regex("^vpc-", var.vpc_id))
    error_message = "VPC ID must begin with 'vpc-'"
  }
}

variable "subnet_id" {
  description = "ID of the subnet"
  type        = string
  
  validation {
    condition     = can(regex("^subnet-", var.subnet_id))
    error_message = "Subnet ID must begin with 'subnet-'"
  }
}

variable "key_name" {
  description = "Name of the SSH key pair"
  type        = string
}

variable "default_tags" {
  description = "Default tags for all resources"
  type        = map(string)
  default     = {}
}