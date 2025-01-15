locals {
  name_prefix = "jenkins-${var.environment}"
  
  # 存储配置
  storage_config = {
    dev = {
      root_volume = {
        size       = 20
        iops      = 3000
        throughput = 125
      }
      data_volume = {
        size       = 30
        iops      = 3000
        throughput = 125
      }
    }
    prod = {
      root_volume = {
        size       = 30
        iops      = 4000
        throughput = 200
      }
      data_volume = {
        size       = 50
        iops      = 4000
        throughput = 200
      }
    }
  }
  
  # 通用标签
  common_tags = merge(
    var.tags,
    {
      Environment = var.environment
      Terraform   = "true"
      Service     = "jenkins"
      ManagedBy   = "terraform"
      Project     = "jenkins-infrastructure"
      Component   = "ci-cd"          # 添加组件标签
      Role        = "jenkins-master"  # 添加角色标签
      Team        = "devops"         # 添加团队标签
    }
  )
}