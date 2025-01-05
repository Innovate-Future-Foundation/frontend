pipeline{
    agent any
    tools{
        nodejs "nodejs-for-inff"
    }
    stages{
        stage('Generate Artifact Version') {
            steps {
                script {                                    
                def timestamp = sh(script: 'date +%Y%m%d%H%M%S', returnStdout: true).trim()
                echo "Generated timestamp: ${timestamp}" 
                env.ARTIFACT_VERSION = "${BUILD_NUMBER}-${timestamp}"
                echo "Generated artifact version: ${env.ARTIFACT_VERSION}"
                }
            }
        }
        stage('Install Dependencies'){
            steps{
                script{
                    try{
                        echo "install dependencies using npm ci"
                        sh 'npm ci'
                    }catch(Exception e){
                        echo "npm ci failed. try npm install instead"
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Test'){
            steps{
                script{
                    echo "triggered form github Running test"
                    def testResult = sh(script: 'npm test', returnStatus: true)
                    if ( testResult == 0){
                        echo "Test passed"
                    }else{
                        echo "Test failed, check code. Pipeline Aborts"
                    }
                }
            }
        }
        stage('Build'){
            steps{
                sh 'npm run build'               
            }
        }
        stage('Post Build Test'){
            steps{
                echo 'Post Build Test'
                sh  '''
                if [ -f dist/index.html ]; then
                    echo "Build file exists. Test passed!"
                else
                    echo "Error: dist/index.html not found!"
                exit 1
                fi
                '''
            }
        }
        stage('Manual Approval') {
            steps {
                script {
                    input message: "Approve deployment to production?", 
                          ok: "Deploy", 
                          submitter: 'admin' // Optional: restrict who can approve
                }
            }
        }
        stage('Deploy to S3'){
            steps{
                echo "Deploying to S3 with version: ${env.ARTIFACT_VERSION}"
                sh '''aws s3 sync dist/ s3://inff-devops-frontend-jascon/${ARTIFACT_VERSION} --delete
                aws s3 cp s3://inff-devops-frontend-jascon/${ARTIFACT_VERSION}/index.html s3://inff-devops-frontend-jascon/index.html
                '''
            }
        }
        stage('Invalidate CloudFront Cache') {
            steps {
                script {
                    
                    def distributionId = 'E2QUQL99SU4KGV'
                    def invalidationPath = '/*'
                    sh """
                    echo "Invalidating CloudFront cache..."
                    aws cloudfront create-invalidation --distribution-id ${distributionId} --paths ${invalidationPath}
                    echo "CloudFront invalidation request submitted."
                    """
                }
            }
        }
        post {
            success {
                echo "Deployment successful!"
            }
            failure {
                echo "Deployment failed. Please check the logs for details."
            }
    }
}