pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        AWS_REGION = 'ap-southeast-2'
        S3_BUCKET = 'www.drcharlotte.link'
        CLOUDFRONT_DISTRIBUTION_ID = 'E219G7VGCN3IRP'
    }

    tools {
        nodejs 'nodejs20'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/devops/mia']], extensions: [], userRemoteConfigs: [[credentialsId: 'githubtoken', url: 'https://github.com/Innovate-Future-Foundation/Frontend.git']])
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

        }
        failure {
            echo 'Pipeline failed!'

        }
    }
}
