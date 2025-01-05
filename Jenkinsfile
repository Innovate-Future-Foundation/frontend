pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        AWS_REGION = 'us-east-1'
        S3_BUCKET = 'inff-devops-frontend-henry-v2'
        CLOUDFRONT_DISTRIBUTION_ID = 'E1UPEE7ZVCSGAE'
    }

    tools {
        nodejs 'nodejs20'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Configure NPM') {
            steps {
                sh '''
                    npm config set fetch-timeout 600000
                    npm config set registry https://registry.npmjs.org/
                '''
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
            emailext (
                subject: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':
                Check console output at: ${env.BUILD_URL}""",
                to: 'henrychienau@gmail.com',
                from: "${GMAIL_CREDS_USR}",
                replyTo: "${GMAIL_CREDS_USR}",
                mimeType: 'text/html',
                attachLog: true
            )
        }
        failure {
            echo 'Pipeline failed!'
            emailext (
                subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':
                Check console output at: ${env.BUILD_URL}""",
                to: 'henrychienau@gmail.com',
                from: "${GMAIL_CREDS_USR}",
                replyTo: "${GMAIL_CREDS_USR}",
                mimeType: 'text/html',
                attachLog: true
            )
        }
    }
}