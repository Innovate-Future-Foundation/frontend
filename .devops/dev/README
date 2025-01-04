# Innovate Future Frontend Deployment Pipeline

This repository contains the Jenkins pipeline configuration for deploying the Innovate Future frontend application to AWS S3 and CloudFront.

## Pipeline Overview

The Jenkins pipeline defined in the `Jenkinsfile` performs the following stages:

1. **Prepare**: Cleans the workspace and sets up environment variables.
2. **Checkout**: Checks out the code from the specified Git branch.
3. **Install Dependency**: Installs the project dependencies using npm.
4. **Build**: Builds the project using npm.
5. **Test**: Runs the tests using npm.
6. **Verify**: Verifies the build artifact by checking for the presence of `index.html` in the `dist` folder.
7. **Deploy**: Deploys the build artifacts to the specified S3 bucket.
8. **Invalidate CloudFront**: Invalidates the CloudFront distribution to ensure the latest changes are served.
9. **Verify Deployment**: Verifies the deployment by checking the HTTP status code of the deployed website. If the deployment fails, it reverts to the previous version.

## Environment Variables

The following environment variables are used in the pipeline:

- `CODE_REPO_URL`: The URL of the Git repository.
- `BRANCH_NAME`: The branch to check out from the Git repository.
- `BASE_DIRECTORY`: The base directory for the project.
- `AWS_REGION`: The AWS region where the S3 bucket and CloudFront distribution are located.
- `S3_BUCKET`: The name of the S3 bucket to deploy to.
- `CLOUD_FRONT_DISTRIBUTION_ID`: The ID of the CloudFront distribution to invalidate.
- `CLOUD_FRONT_DISTRIBUTION_URL`: The URL of the CloudFront distribution.
- `WEBSITE_URL`: The URL of the deployed website.

## Jenkins Pipeline Stages

### Prepare

- Cleans the workspace.
- Sets up environment variables.
- Prints the Node.js and npm versions.

### Checkout

- Checks out the code from the specified Git branch.

### Install Dependency

- Installs the project dependencies using npm.

### Build

- Builds the project using npm.

### Test

- Runs the tests using npm.

### Verify

- Verifies the build artifact by checking for the presence of `index.html` in the `dist` folder.

### Deploy

- Deploys the build artifacts to the specified S3 bucket using the AWS CLI.

### Invalidate CloudFront

- Invalidates the CloudFront distribution to ensure the latest changes are served.

### Verify Deployment

- Verifies the deployment by checking the HTTP status code of the deployed website.
- If the deployment fails, it reverts to the previous version by syncing the S3 bucket with the previous deployment and invalidating the CloudFront distribution.

## Post Actions

- Sends a notification to a Discord webhook with the build details and status.

## Usage

To use this Jenkins pipeline, follow these steps:

1. Set up a Jenkins job with this repository.
2. Configure the necessary environment variables in the Jenkins job.
3. Run the Jenkins job to deploy the frontend application.

## License
