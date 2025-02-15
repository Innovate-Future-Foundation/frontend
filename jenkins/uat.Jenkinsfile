import java.text.SimpleDateFormat
import java.net.URLEncoder
SimpleDateFormat dayFormat = new SimpleDateFormat('yyyy/MM/dd HH:mm:ss');
def nowTimesamp = dayFormat.format(new Date());

pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-southeast-2'
        FRONTEND_BUCKET = 'inff-uat-frontend-bkt'
        CLOUD_FRONT_DISTRIBUTION_ID = 'E16VFEWHWJKKR9'
        API_URL = 'https://uat.innovatefuture.foundation'
        WEBSITE_URL = 'https://uat.innovatefuture.foundation'
        ENV_FILE = '.env'
        PATH = "$HOME/.nvm/versions/node/v22.1.0/bin:$PATH"
    }
    // parameters {

    // }
    stages {
        stage ('Prepare') {
            steps {
                script {
                    echo "=== Preparing CICD Pipeline ==="
                    echo "- Node version: ${sh(script: 'node --version', returnStdout: true)}"
                    echo "- NPM version: ${sh(script: 'npm --version', returnStdout: true)}"
                    echo "- Setting args and env vars"
                    sh 'cp .env.example ${ENV_FILE}'
                    // Update existing
                    sh ("""
                    sed -i "s|VITE_REACT_APP_INNOVATE_FUTURE_API_BASE_URL=.*|VITE_REACT_APP_INNOVATE_FUTURE_API_BASE_URL=${env.API_URL}|g" ${ENV_FILE}
                    """)
                    // Add new vars
                    // echo "REACT_APP_API_KEY=${REACT_APP_API_KEY}" >> ${ENV_FILE}
                }
            }
        }
        stage ('Install Dependency') {
            steps {
                script {
                    echo 'Installing dependency...'
                    sh 'npm install'
                }
            }
        }
        stage ('Build') {
            steps {
                script {
                    // mv .env.example .env
                    
                    // overwrite .env file
                    echo 'Building...'
                    sh 'npm run build'
                }
            }
        }
        stage ('Test') {
            steps {
                script {
                    echo 'Testing...'
                    sh 'npm test'
                }
            }
        }
        stage ('Verify') {
            steps {
                script {
                    echo 'Verifying build artifact...'
                    sh """
                        if [ ! -f dist/index.html ]; then
                            echo "Verification failed: index.html not found in the dist folder!"
                            exit 1
                        else
                            echo "Verification successful: index.html found in the dist folder."
                        fi
                    """
                }
            }
        }
        stage ('Deploy') {
            steps {
                script {
                    echo 'Deploying...'
                    withAWS(credentials: 'uat_cd_access_key', region: env.AWS_REGION) {
                        sh "aws s3 sync dist/ s3://${env.FRONTEND_BUCKET} --delete"
                    }
                }
            }
        }
        stage ('Invalidate CloudFront') {
            steps {
                script {
                    echo 'Invalidate CloudFront...'
                    withAWS(credentials: 'uat_cd_access_key', region: env.AWS_REGION) {
                        sh """
                            aws cloudfront create-invalidation --distribution-id ${env.CLOUD_FRONT_DISTRIBUTION_ID} --paths "/*"
                        """
                    }
                }
            }
        }

        /** 
          * Verify deployment by checking the HTTP status code of the deployed website
          * if status code is 200, deployment is successful
          * if status code is not 200, deployment is failed, then revert the deployment by switching back to the previous version
        **/
        stage ('Verify Deployment') {
            steps {
                script {
                    echo 'Verifying deployment...'
                    def responseCode = sh(
                        script:  "curl -s -o /dev/null -w '%{http_code}' ${env.WEBSITE_URL}",
                        returnStdout: true).trim()
                    if (responseCode.startsWith('2')) {
                        echo 'Deployment successful!'
                    } else {
                        echo 'Deployment failed! Reverting deployment...'
                        // todo roll back to last working version
                        
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
    post {
        always {
            script {
//                 def jobName = java.net.URLEncoder.encode(env.JOB_NAME, "UTF-8").replace("+", "%20")
//                 def blueOceanUrl = "${env.JENKINS_URL}blue/organizations/jenkins/${jobName}/detail/${jobName}/${env.BUILD_NUMBER}/pipeline"
//                 wrap([$class: 'BuildUser']) {
//                     discordSend(
//                         webhookURL: 'https://discord.com/api/webhooks/1325091913975595080/1U_xTAiCnW3O526iK88OOGTj375WKko-4xwHNSRJDyb-FIT3ZzybTIUx9asCN9YNeslr',
//                         title: "${env.JOB_NAME} Deployment to ${env.S3_BUCKET} completed with status: ${currentBuild.currentResult}",
//                         description: """
// ## Pipeline Build
// - Job Duration: ${currentBuild.durationString.replace(' and counting', '')}
// - Triggered by: ${env.BUILD_USER} <${env.BUILD_USER_EMAIL}>
// - Triggered at: ${nowTimesamp} UTC
// ## Git
// - Repository: ${env.CODE_REPO_URL}
// - Branch: ${env.GIT_BRANCH}
// - Commit: `${env.GIT_COMMIT}` by ${env.GIT_AUTHOR_NAME}
// ## URLs
// - [CloudFront](${env.CLOUD_FRONT_DISTRIBUTION_URL})
// - [Website](https://inff-web.mark-it-zone.com/)
//                         """,
//                         link: blueOceanUrl,
//                         result: currentBuild.currentResult
//                     )
//                 }

                echo 'Clean Workspace...'
                cleanWs()
            }
        }
    }
}