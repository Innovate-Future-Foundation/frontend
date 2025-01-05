pipeline {
    agent any
        
    environment {
        CODE_REPO_URL = 'https://github.com/Innovate-Future-Foundation/Frontend'
        BRANCH_NAME = 'devops/mia'
        BASE_DIRECTORY = './'
        AWS_REGION = 'ap-southeast-2'
        S3_BUCKET = 'www.drcharlotte.link'
        CLOUD_FRONT_DISTRIBUTION_ID = 'E219G7VGCN3IRP'
        CLOUD_FRONT_DISTRIBUTION_URL = 'd1q1ia269mn16b.cloudfront.net'
        WEBSITE_URL = 'https://www.drcharlotte.link/'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --verbose'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to S3') {
            steps {
                withAWS(credentials: 'aws-credentials', region: env.AWS_REGION) {
                    sh 'aws s3 sync dist/ s3://${S3_BUCKET} --delete'
                }
            }
        }

        stage('Invalidate CloudFront') {
            steps {
                withAWS(credentials: 'aws-credentials', region: env.AWS_REGION) {
                    sh 'aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths "/*"'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'

        }
        failure {
            echo 'Pipeline failed!'

        }
    }
}
