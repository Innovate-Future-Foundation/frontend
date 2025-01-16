package org.innofa.utils

class SSMUtils {
    static def getParameter(script, String paramName, String environment = 'prod') {
        return script.sh(
            script: "aws ssm get-parameter --name '/frontend/${environment}/${paramName}' --query 'Parameter.Value' --output text",
            returnStdout: true
        ).trim()
    }

    static def loadConfigToEnv(script, List<String> paramNames, String environment = 'prod') {
        paramNames.each { paramName ->
            def value = getParameter(script, paramName, environment)
            // 转换参数名为环境变量格式 (例如: s3_bucket_name -> S3_BUCKET_NAME)
            def envName = paramName.toUpperCase()
            script.env[envName] = value
        }
    }
}

// vars/loadConfig.groovy
import org.innofa.utils.SSMUtils

def call(List<String> paramNames = null, String environment = 'prod') {
    def defaultParams = [
        's3_bucket_name',
        'cloudfront_distribution_id',
        'aws_region',
        'node_version',
        'build_memory'
    ]
    
    def paramsToLoad = paramNames ?: defaultParams
    
    withAWS(credentials: 'aws-credentials', region: 'ap-southeast-2') {
        SSMUtils.loadConfigToEnv(this, paramsToLoad, environment)
    }
}