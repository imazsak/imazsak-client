pipeline {
  agent any
  stages {
    stage('Build image') {
      steps {
        sh "docker build -t imazsak-client:${env.GIT_COMMIT} ."
      }
    }
    stage('Tag & Push') {
      steps {
        sh "docker tag imazsak-client:${env.GIT_COMMIT} rg.fr-par.scw.cloud/imazsak/imazsak-client:${env.GIT_COMMIT}"
        script {
          withDockerRegistry(credentialsId: 'scaleway-imazsak-registry', url: 'https://rg.fr-par.scw.cloud/imazsak') {
            docker.image("rg.fr-par.scw.cloud/imazsak/imazsak-client:${env.GIT_COMMIT}").push()
          }
        }
      }
    }
  }
}
