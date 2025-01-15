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
        NODE_OPTIONS = '--max-old-space-size=4096' // 增加 Node.js 内存限制
    }

    stages {
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
                    script {
                        withAWS(credentials: 'aws-credentials', region: 'ap-southeast-2') {
                            // 确保构建目录存在
                            sh 'test -d dist || (echo "Build directory not found" && exit 1)'
                            
                            // 部署到 S3
                            sh """
                                echo "Starting S3 sync..."
                                aws s3 sync ./dist s3://${S3_BUCKET_NAME} --delete
                                echo "S3 sync completed"
                            """

                            // 清除 CloudFront 缓存
                            sh """
                                echo "Invalidating CloudFront cache..."
                                aws cloudfront create-invalidation \
                                    --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} \
                                    --paths "/*"
                                echo "CloudFront invalidation initiated"
                            """
                        }
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
        unstable {
            echo 'Pipeline is unstable. Some tests may have failed.'
        }
    }
}