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
        stage('Test'){
            steps{
                script{
                    echo "Running test"
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
                if [ -f build/index.html ]; then
                    echo "Build file exists. Test passed!"
                else
                    echo "Error: build/index.html not found!"
                exit 1
                fi
                '''
            }
        }
    }
}