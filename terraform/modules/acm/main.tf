# terraform/modules/acm/main.tf
resource "aws_acm_certificate" "cert" {
  domain_name       = var.domain_name
  validation_method = "DNS"

  tags = merge(
    var.tags,
    {
      Name        = "${var.domain_name}-cert"
      Environment = var.environment
    }
  )

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

# 获取 Route 53 区域
data "aws_route53_zone" "zone" {
  name         = var.domain_name
  private_zone = false
}

# 创建证书验证记录
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.zone.zone_id
}

# terraform/modules/acm/variables.tf
variable "domain_name" {
  description = "Domain name for the certificate"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}

# terraform/modules/acm/outputs.tf
output "certificate_arn" {
  description = "ARN of the certificate"
  value       = aws_acm_certificate.cert.arn
}

output "certificate_id" {
  description = "ID of the certificate"
  value       = aws_acm_certificate.cert.id
}