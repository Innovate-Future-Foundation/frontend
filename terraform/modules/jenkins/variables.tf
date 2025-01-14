variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-2"
}

variable "vpc_id" {
  description = "VPC ID where Jenkins will be deployed"
  type        = string
  
  validation {
    condition     = can(regex("^vpc-", var.vpc_id))
    error_message = "VPC ID must begin with 'vpc-'"
  }
}

variable "subnet_id" {
  description = "Subnet ID where Jenkins will be deployed"
  type        = string
  
  validation {
    condition     = can(regex("^subnet-", var.subnet_id))
    error_message = "Subnet ID must begin with 'subnet-'"
  }
}

variable "ami_id" {
  description = "AMI ID for Jenkins instance"
  type        = string
  default     = "ami-0310483fb2b488153"  # Ubuntu 22.04 LTS in ap-southeast-2
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

variable "create_dns_record" {
  description = "Whether to create Route 53 DNS record"
  type        = bool
  default     = false
}

variable "create_certificate" {
  description = "Whether to create ACM certificate"
  type        = bool
  default     = false
}

variable "domain_name" {
  description = "Domain name for Jenkins (e.g., innofa.click)"
  type        = string
  default     = "innofa.click "
}

variable "route53_zone_id" {
  description = "Route 53 hosted zone ID"
  type        = string
  default     = "Z034911218TP1OPW0JBBL"
}

variable "tags" {
  description = "Additional tags for resources"
  type        = map(string)
  default     = {}
}