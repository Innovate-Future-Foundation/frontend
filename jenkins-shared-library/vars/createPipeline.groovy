def call(Map config) {
    pipelineJob(config.name) {
        definition {
            cpsScm {
                scm {
                    git {
                        remote {
                            url(config.repository)
                            credentials(config.credentials)
                        }
                        branch(config.branch)
                        extensions {
                            cleanBeforeCheckout()
                        }
                    }
                }
                scriptPath(config.jenkinsfile ?: 'Jenkinsfile')
            }
        }
        
        triggers {
            scm(config.pollSchedule ?: 'H/15 * * * *')
        }
    }
}