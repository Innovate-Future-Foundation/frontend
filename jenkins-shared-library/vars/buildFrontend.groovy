import org.innofa.utils.BuildUtils

def call(Map config = [:]) {
    BuildUtils.buildFrontend(this, config)
}
