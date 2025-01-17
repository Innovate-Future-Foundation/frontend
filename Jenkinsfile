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
                    // 从 AWS SSM 加载配置
                    withAWS(credentials: 'aws-credentials', region: env.AWS_REGION) {
                        // 加载 S3 配置
                        env.S3_BUCKET_NAME = sh(
                            script: "aws ssm get-parameter --name '/frontend/prod/s3_bucket_name' --query 'Parameter.Value' --output text",
                            returnStdout: true
                        ).trim()
                        
                        // 加载 CloudFront 配置
                        env.CLOUDFRONT_DISTRIBUTION_ID = sh(
                            script: "aws ssm get-parameter --name '/frontend/prod/cloudfront_distribution_id' --query 'Parameter.Value' --output text",
                            returnStdout: true
                        ).trim()
                        
                        // 加载构建内存配置
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
        
        stage('Prepare Workspace') {
            steps {
                cleanWs()
                checkout scm
            }
        }
        
        stage('Verify Environment') {
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
        
        stage('Deploy') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    withAWS(credentials: 'aws-credentials', region: env.AWS_REGION) {
                        // 部署到 S3
                        echo "Deploying to S3 bucket: ${env.S3_BUCKET_NAME}"
                        sh "aws s3 sync ./dist s3://${env.S3_BUCKET_NAME} --delete"
                        
                        // 清除 CloudFront 缓存
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