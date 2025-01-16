import org.innofa.utils.AwsUtils
import org.innofa.Constants

def call(Map config) {
    def environment = config.environment ?: 'dev'
    def distributionId = config.distributionId ?: Constants.ENVIRONMENTS[environment].cloudFrontId
    
    withAWS(credentials: 'aws-credentials', region: Constants.DEFAULT_AWS_REGION) {
        AwsUtils.invalidateCloudFront(this, distributionId)
    }
}