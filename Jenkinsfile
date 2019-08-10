pipeline {
  agent {
    label 'docker'
  }
  stages {
    stage('Build image') {
      steps {
        sh "docker build -t imazsak-client:${env.GIT_COMMIT} ."
      }
    }
    stage('Tag & Push') {
      steps {
        sh "docker tag imazsak-client:${env.GIT_COMMIT} 002545499693.dkr.ecr.eu-central-1.amazonaws.com/imazsak-client:${env.GIT_COMMIT}"
        script {
          withDockerRegistry(credentialsId: 'ecr:eu-central-1:imazsak-ci-aws', url: 'https://002545499693.dkr.ecr.eu-central-1.amazonaws.com') {
            docker.image("002545499693.dkr.ecr.eu-central-1.amazonaws.com/imazsak-client:${env.GIT_COMMIT}").push()
          }
        }
      }
    }
  }
}
