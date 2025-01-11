# CI/CD Pipeline Documentation

## Overview
This repository contains Jenkins pipeline configurations for a Node.js application with automated build and deployment to AWS S3 and CloudFront. The pipeline is split into two parts: Continuous Integration (CI) and Continuous Delivery (CD).

## Prerequisites

**Required Tools**
- Jenkins server
- Node.js 20
- AWS CLI
- Git

**Jenkins Plugins**
- NodeJS Plugin
- AWS Steps Plugin
- Copy Artifacts Plugin
- Credentials Plugin
- Email Extension Plugin

## Environment Variables

**CI Pipeline**
```groovy
NODE_VERSION = '20'
SMTP_CREDS = credentials('smtp-credentials')
```

**CD Pipeline**
```groovy
AWS_REGION = 'ap-southeast-2'
S3_BUCKET = 'devops-fan'
CLOUDFRONT_DISTRIBUTION_ID = 'E2BQAOIVAQ515Q'
SMTP_CREDS = credentials('smtp-credentials')
```

## Pipeline Stages

**CI Pipeline (Jenkinsfile.ci)**
1. Checkout: Retrieves source code
2. Configure NPM: Sets up NPM settings
3. Install Dependencies: Installs project dependencies
4. Build: Compiles the application
5. Archive Artifacts: Stores build artifacts

**CD Pipeline (Jenkinsfile.cd)**
1. Copy Artifacts: Retrieves built artifacts from CI
2. Deploy to S3: Uploads artifacts to AWS S3
3. Invalidate CloudFront: Updates CDN cache

## Required Credentials

**Jenkins Credentials**
1. `smtp-credentials`: Gmail SMTP credentials
   - Username: Your Gmail address
   - Password: Gmail App Password
2. `aws-credentials`: AWS IAM credentials
   - Access Key ID
   - Secret Access Key

## AWS Configuration

**Required Resources**
- S3 bucket configured for static website hosting
- CloudFront distribution connected to S3 bucket
- IAM user with appropriate permissions

**IAM Policy Requirements**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket",
                "cloudfront:CreateInvalidation"
            ],
            "Resource": [
                "arn:aws:s3:::devops-fan/*",
                "arn:aws:cloudfront::*:distribution/E2BQAOIVAQ515Q"
            ]
        }
    ]
}
```

## Email Notifications

The pipeline sends email notifications for:
- Successful builds and deployments
- Failed builds and deployments

## Best Practices
- Regularly rotate AWS and SMTP credentials
- Monitor S3 bucket permissions
- Review CloudFront cache settings
- Maintain proper version control
- Implement deployment approvals for production
- Regular backup of Jenkins configuration

## Troubleshooting

**Common Issues**
- SMTP Connection Issues: Verify Gmail App Password and firewall settings
- AWS Authentication: Check IAM permissions and credentials
- Build Failures: Verify Node.js version compatibility
- Artifact Copy Issues: Ensure proper job naming and permissions
