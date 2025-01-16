// jenkins-shared-library/src/org/innofa/Constants.groovy

package org.innofa

class Constants {
    static final String DEFAULT_NODE_VERSION = 'Node18'
    static final String DEFAULT_AWS_REGION = 'ap-southeast-2'
    
    // 移除硬编码的环境配置，改用 SSM 参数
    static def getEnvironmentConfig(script, environment) {
        def config = [:]
        
        // 使用 AWS CLI 从 SSM 获取参数
        config.s3Bucket = script.sh(
            script: "aws ssm get-parameter --name '/frontend/${environment}/s3_bucket_name' --query 'Parameter.Value' --output text",
            returnStdout: true
        ).trim()
        
        config.cloudFrontId = script.sh(
            script: "aws ssm get-parameter --name '/frontend/${environment}/cloudfront_distribution_id' --query 'Parameter.Value' --output text",
            returnStdout: true
        ).trim()
        
        return config
    }
}