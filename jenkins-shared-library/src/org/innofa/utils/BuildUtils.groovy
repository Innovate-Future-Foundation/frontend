package org.innofa.utils

import org.innofa.Constants

class BuildUtils {
    static def buildFrontend(script, Map config = [:]) {
        def nodeVersion = config.nodeVersion ?: Constants.DEFAULT_NODE_VERSION
        
        script.nodejs(nodeJSInstallationName: nodeVersion) {
            script.sh 'npm ci'
            
            if (config.runLint) {
                script.sh 'npm run lint'
            }
            
            script.sh 'npm run build'
            
            if (config.runTests) {
                script.sh 'npm run test'
            }
        }
    }
}