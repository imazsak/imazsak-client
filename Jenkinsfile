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
    stage('Stage Deploy') {
      steps {
        script {
          sshagent (credentials: ['github-jenkins-imazsak']) {
            sh """
              rm -R infra || true
              GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no" git clone git@github.com:Ksisu/imazsak-stage-infra.git infra && cd infra
              sed -i "s|\\(image: 002545499693.dkr.ecr.eu-central-1.amazonaws.com/imazsak-client\\).*|\\1:${env.GIT_COMMIT}|" ./client/client.yml
              git add ./client/client.yml
              git config user.email "ci@imazsak.hu"
              git config user.name "Jenkins"
              git commit -m "Upgrade client ${env.GIT_COMMIT}" || true
              GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no" git push git@github.com:Ksisu/imazsak-stage-infra.git master
            """
          }
          sshagent (credentials: ['imazsak-stage-vm']) {
            sh """
              ssh -o StrictHostKeyChecking=no root@stage.imazsak.hu "eval \$(aws ecr get-login --region eu-central-1 --no-include-email) && cd /opt/imazsak-stage && git pull && docker stack deploy --compose-file ./client/client.yml --with-registry-auth --prune client"
            """
          }
        }
      }
    }
  }
}
