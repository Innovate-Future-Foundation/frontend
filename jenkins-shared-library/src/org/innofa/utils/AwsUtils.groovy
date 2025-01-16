package org.innofa.utils

class AwsUtils {
    static def deployToS3(script, String sourcePath, String bucket) {
        script.sh """
            echo "Starting S3 sync..."
            aws s3 sync ${sourcePath} s3://${bucket} --delete
            echo "S3 sync completed"
        """
    }

    static def invalidateCloudFront(script, String distributionId) {
        script.sh """
            echo "Invalidating CloudFront cache..."
            aws cloudfront create-invalidation \
                --distribution-id ${distributionId} \
                --paths "/*"
            echo "CloudFront invalidation initiated"
        """
    }
}