import org.innofa.utils.AwsUtils
import org.innofa.Constants

def call(Map config) {
    def environment = config.environment ?: 'dev'
    def bucket = config.bucket ?: Constants.ENVIRONMENTS[environment].s3Bucket
    
    withAWS(credentials: 'aws-credentials', region: Constants.DEFAULT_AWS_REGION) {
        AwsUtils.deployToS3(this, './dist', bucket)
    }
}