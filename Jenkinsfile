pipeline {
    agent any
    
    tools {
        nodejs 'Node18'
    }
    
    environment {
        AWS_REGION = 'ap-southeast-2'
    }
    
    stages {
        stage('Load Configuration') {
            steps {
                script {
                    // 从 SSM 获取所有必要的配置和凭证
                    AWS_ACCESS_KEY = sh(
                        script: "aws ssm get-parameter --name '/frontend/prod/aws_access_key' --with-decryption --query 'Parameter.Value' --output text",
                        returnStdout: true
                    ).trim()
                    
                    AWS_SECRET_KEY = sh(
                        script: "aws ssm get-parameter --name '/frontend/prod/aws_secret_key' --with-decryption --query 'Parameter.Value' --output text",
                        returnStdout: true
                    ).trim()
                    
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
                    
                    // 设置 AWS 临时凭证
                    withEnv([
                        "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY}",
                        "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_KEY}",
                        "AWS_DEFAULT_REGION=${AWS_REGION}",
                        "NODE_OPTIONS=--max-old-space-size=${BUILD_MEMORY}"
                    ]) {
                        // 设置 AWS 凭证
                        sh '''
                            aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID}
                            aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}
                            aws configure set default.region ${AWS_DEFAULT_REGION}
                        '''
                    }
                }
            }
        }
        
        stage('Prepare Workspace') {
            steps {
                sh 'rm -rf *'
                checkout scm
            }
        }
        
        stage('Verify Environment') {
            steps {
                sh '''
                    echo "Node version: $(node -v)"
                    echo "NPM version: $(npm -v)"
                    echo "Git version: $(git --version)"
                    aws --version
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
                    sh "aws s3 sync ./dist s3://${env.S3_BUCKET_NAME} --delete"
                    sh """
                        aws cloudfront create-invalidation \
                            --distribution-id ${env.CLOUDFRONT_DISTRIBUTION_ID} \
                            --paths "/*"
                    """
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