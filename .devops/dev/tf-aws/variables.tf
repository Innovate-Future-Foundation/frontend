variable "s3_name" {
  type    = string
  default = "frontend-bucket-inff-mark"

}

variable "region" {
  type    = string
  default = "ap-southeast-2"
}

variable "domain" {
  type    = string
  default = "mark-it-zone.com"
}

variable "certificate_arn" {
  type    = string
  default = "arn:aws:acm:us-east-1:842675993907:certificate/749c46e3-1d50-480c-8f49-1144af1950d1"
}
