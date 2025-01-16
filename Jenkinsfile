@Library('jenkins-shared-library') _

pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    environment {
        AWS_CREDENTIALS = credentials('aws-credentials')
        AWS_REGION = 'ap-southeast-2'
    }

    stages {
        stage('Load Configuration') {
            steps {
                script {
                    // 从 SSM 加载所有配置
                    withAWS(credentials: 'aws-credentials', region: env.AWS_REGION) {
                        env.S3_BUCKET_NAME = sh(
                            script: "aws ssm get-parameter --name '/frontend/prod/s3_bucket_name' --query 'Parameter.Value' --output text",
                            returnStdout: true
                        ).trim()
                        
                        env.CLOUDFRONT_DISTRIBUTION_ID = sh(
                            script: "aws ssm get-parameter --name '/frontend/prod/cloudfront_distribution_id' --query 'Parameter.Value' --output text",
                            returnStdout: true
                        ).trim()
                        
                        env.BUILD_MEMORY = sh(
                            script: "aws ssm get-parameter --name '/frontend/prod/build_memory' --query 'Parameter.Value' --output text",
                            returnStdout: true
                        ).trim()
                        
                        // 设置 Node.js 内存限制
                        env.NODE_OPTIONS = "--max-old-space-size=${env.BUILD_MEMORY}"
                    }
                }
            }
        }

        stage('Cleanup Workspace') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Verify Tools') {
            steps {
                sh '''
                    echo "Node version: $(node -v)"
                    echo "NPM version: $(npm -v)"
                    echo "Git version: $(git --version)"
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build') {
            steps {
                timeout(time: 15, unit: 'MINUTES') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to S3') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    withAWS(credentials: 'aws-credentials', region: env.AWS_REGION) {
                        echo "Deploying to S3 bucket: ${env.S3_BUCKET_NAME}"
                        sh "aws s3 sync ./dist s3://${env.S3_BUCKET_NAME} --delete"
                        
                        echo "Invalidating CloudFront cache for distribution: ${env.CLOUDFRONT_DISTRIBUTION_ID}"
                        sh """
                            aws cloudfront create-invalidation \
                                --distribution-id ${env.CLOUDFRONT_DISTRIBUTION_ID} \
                                --paths "/*"
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check the logs for details.'
        }
    }
}