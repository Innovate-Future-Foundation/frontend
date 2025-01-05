pipeline {
    agent { label 'frontend-agent' } 
    // agent
    tools {
        nodejs "Node18" 
    }

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-credentials') 
        AWS_SECRET_ACCESS_KEY = credentials('aws-credentials')
        S3_BUCKET_NAME = 'devops-fan' 
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to S3') {
            when {
                branch 'devops/fan-wang' 
            }
            steps {
                sh '''
                aws s3 sync ./dist s3://devops-fan --delete
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Succeeded'
        }
        failure {
            echo 'Deployment Failed'
        }
    }
}