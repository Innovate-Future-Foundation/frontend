# Jenkins Pipeline Documentation

## Overview

This Jenkins pipeline automates the build and deployment process for the INFF Frontend application. It handles the complete CI/CD workflow from code checkout to CloudFront invalidation.

## Pipeline Structure

### Environment Variables

```groovy
environment {
    NODE_VERSION = '20'              // Node.js version requirement
    AWS_REGION = 'us-east-1'         // AWS region for deployment
    S3_BUCKET = 'inff-devops-frontend-henry-v2'  // Target S3 bucket
    CLOUDFRONT_DISTRIBUTION_ID = 'E1UPEE7ZVCSGAE' // CloudFront distribution
}
```

### Tools

```groovy
tools {
    nodejs 'nodejs20'    // Specifies Node.js 20.x as the required runtime
}
```

### Stages

### 1. Checkout

- **Purpose**: Retrieves source code from the Git repository
- **Command**: `checkout scm`
- **Note**: Uses the configured SCM (Source Control Management) settings

### 2. Configure NPM

- **Purpose**: Sets up NPM configuration for reliable package installation
- **Commands**:
  - Sets fetch timeout to 10 minutes
  - Configures NPM registry URL

```bash
npm config set fetch-timeout 600000
npm config set registry <https://registry.npmjs.org/>
```

### 3. Install Dependencies

- **Purpose**: Installs project dependencies
- **Command**: `npm install --verbose`
- **Note**: Verbose flag provides detailed installation logs

### 4. Build

- **Purpose**: Compiles and builds the application
- **Command**: `npm run build`
- **Output**: Creates production build in `dist/` directory

### 5. Deploy to S3

- **Purpose**: Uploads built files to AWS S3
- **Command**: `aws s3 sync dist/ s3://${S3_BUCKET} --delete`
- **Note**: `-delete` flag removes files in S3 that don't exist locally

### 6. Invalidate CloudFront

- **Purpose**: Invalidates CloudFront cache to serve new content
- **Command**: `aws cloudfront create-invalidation`
- **Path**: Invalidates all paths (`/*`)

### Post Actions

- **Success**: Logs successful pipeline completion
- **Failure**: Logs pipeline failure

## Prerequisites

### Jenkins Configuration

1. **Plugins Required**:
   - NodeJS Plugin
   - AWS Credentials Plugin
   - Pipeline Plugin
     - Pipeline: AWS Steps
     - Pipeline: GitHub
     - Pipeline: Stageview
   - Git Plugin
     - GitHub Integration
2. **Credentials Required**:
   - AWS credentials with ID 'aws-credentials'
   - Git credentials (if repository is private)
3. **Tools Configuration**:
   - NodeJS 20.x installation
