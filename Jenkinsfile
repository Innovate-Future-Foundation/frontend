pipeline {
    agent any

    environment {
        NODE_VERSION = '20' // Node.js version requirement
        AWS_REGION = 'ap-southeast-2' // AWS region for deployment
        S3_BUCKET = 'devops-fan' // Target S3 bucket
        CLOUDFRONT_DISTRIBUTION_ID = 'E2BQAOIVAQ515Q' // CloudFront distribution ID
    }

    tools {
        nodejs 'nodejs20' // Specifies Node.js 20.x as the required runtime
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Configure NPM') {
            steps {
                echo 'Configuring NPM...'
                sh '''
                    npm config set fetch-timeout 600000
                    npm config set registry https://registry.npmjs.org/
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                sh 'npm install --verbose'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm run build'
            }
        }

        stage('Deploy to S3') {
            steps {
                echo 'Deploying to S3...'
                withAWS(region: "${AWS_REGION}", credentials: 'aws-credentials') {
                    sh "aws s3 sync dist/ s3://${S3_BUCKET} --delete"
                }
            }
        }

        stage('Invalidate CloudFront') {
            steps {
                echo 'Invalidating CloudFront cache...'
                withAWS(region: "${AWS_REGION}", credentials: 'aws-credentials') {
                    sh "aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths /*"
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
