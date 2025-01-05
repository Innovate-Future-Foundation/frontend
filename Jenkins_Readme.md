Overview
This Jenkins pipeline is designed to automate the process of building and deploying a Node.js application to an Amazon S3 bucket. It utilizes a dedicated agent for frontend tasks and incorporates stages for checking out code, installing dependencies, building the application, and deploying the build artifacts to S3.
Requirements
Jenkins: Ensure you have a Jenkins server set up.
Node.js: This pipeline uses Node.js version 18. Make sure it is installed and configured in Jenkins.
AWS CLI: The AWS Command Line Interface (CLI) should be installed on the Jenkins agent to facilitate deployment to S3.
Credentials: AWS credentials must be configured in Jenkins under the ID aws-credentials.
Pipeline Structure
The pipeline consists of several key components:
Agent
groovy
agent { label 'frontend-agent' }
This specifies that the pipeline will run on an agent labeled frontend-agent.
Tools
groovy
tools {
    nodejs "Node18"
}
This section defines that Node.js version 18 will be used during the pipeline execution.
Environment Variables
groovy
environment {
    AWS_ACCESS_KEY_ID = credentials('aws-credentials')
    AWS_SECRET_ACCESS_KEY = credentials('aws-credentials')
    S3_BUCKET = 'devops-fan'
}
Environment variables are set for AWS access and the target S3 bucket.
Stages
The pipeline is divided into several stages:
Checkout Code
groovy
stage('Checkout Code') {
    steps {
        checkout scm
    }
}
This stage checks out the source code from the configured SCM (Source Control Management).
Install Dependencies
groovy
stage('Install Dependencies') {
    steps {
        sh 'npm install'
    }
}
This stage installs the necessary Node.js dependencies using npm.
Build
groovy
stage('Build') {
    steps {
        sh 'npm run build'
    }
}
This stage builds the application using the specified build script defined in package.json.
Deploy to S3
groovy
stage('Deploy to S3') {
    when {
        branch 'devops/fan-wang'
    }
    steps {
        sh '''
        aws s3 sync ./dist s3://${S3_BUCKET} --delete
        '''
    }
}
This stage deploys the built artifacts from the dist directory to the specified S3 bucket, but only when the branch devops/fan-wang is being built.
Post Actions
groovy
post {
    success {
        echo 'Deployment Succeeded'
    }
    failure {
        echo 'Deployment Failed'
    }
}
After pipeline execution, this section provides feedback on whether the deployment was successful or failed.
Usage
To use this pipeline:
Copy the provided code into a new Jenkins Pipeline project.
Ensure all prerequisites are met, including agent configuration and AWS credentials.
Trigger a build on the branch devops/fan-wang to deploy your application.
Conclusion
This Jenkins pipeline automates key aspects of your Node.js application lifecycle, from code checkout through deployment. By following this README, you can efficiently set up and utilize this CI/CD process for your frontend projects.