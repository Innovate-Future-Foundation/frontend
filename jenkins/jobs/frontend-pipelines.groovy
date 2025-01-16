// jenkins/jobs/frontend-pipelines.groovy
// 创建前端相关的文件夹
folder('frontend') {
    displayName('Frontend')
    description('Frontend CI/CD Projects')
}

// 创建主流水线
pipelineJob('frontend/main-pipeline') {
    description('Frontend CI/CD Pipeline')
    
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        url('https://github.com/innovate-Future-Foundation/Frontend.git')
                        credentials('github-credentials')
                    }
                    branch('*/devops/dylan-v2')
                    extensions {
                        cleanBeforeCheckout()
                    }
                }
            }
            scriptPath('Jenkinsfile')
        }
    }
    
    properties {
        githubProjectProperty {
            projectUrlStr('https://github.com/innovate-Future-Foundation/Frontend')
        }
    }
    
    triggers {
        githubPush()
    }
}