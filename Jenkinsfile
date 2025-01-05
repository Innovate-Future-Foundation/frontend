pipeline {
    agent { label 'jenkins_slave' }
        
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
    
    parameters {
        string(name: 'AWS_CREDENTIAL_ID', defaultValue: 'miagracetang-at-145367278427', description: 'The ID of the AWS credentials to use')
        string(name: 'S3_BUCKET', defaultValue: '', description: 'The name of the S3 bucket to deploy to')
        string(name: 'GIT_BRANCH', defaultValue: 'devops/mia', description: 'The Git branch to build and deploy')
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout the specified branch
                    checkout([$class: 'GitSCM', branches: [[name: '*/devops/mia']], extensions: [], userRemoteConfigs: [[credentialsId: 'githubtoken', url: 'https://github.com/Innovate-Future-Foundation/Frontend.git']])
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install --verbose'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'npm run lint'
                sh 'docker builder prune -f'
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
