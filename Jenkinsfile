pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-credentials')
        AWS_SECRET_ACCESS_KEY = credentials('aws-credentials')
        S3_BUCKET_NAME = 'if-devops-front-personal-test'
        CLOUDFRONT_DISTRIBUTION_ID = credentials('cloudfront-dist-id')
    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to S3') {
            steps {
                script {
                    withAWS(credentials: 'aws-credentials', region: 'ap-southeast-2') {
                        sh "aws s3 sync ./dist s3://${S3_BUCKET_NAME} --delete"

                        sh """
                            aws cloudfront create-invalidation \
                                --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} \
                                --paths "/*"
                        """
                    }
                }
            }
        }
    }
}
