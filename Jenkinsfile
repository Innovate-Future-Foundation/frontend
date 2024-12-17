pipeline{
    agent any
    tools{
        nodejs "nodejs-for-inff"
    }
    stages{

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
        stage('Build'){
            steps{
                sh 'npm run build'               
            }
        }
        stage('Test'){
            steps{
                echo 'Test stage'
            }
        }
    }
}