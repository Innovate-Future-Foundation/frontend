provider "aws" {
  region = "ap-southeast-2" # Change this to your preferred AWS region
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
