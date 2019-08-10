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
        sh "docker tag imazsak-client:${env.GIT_COMMIT} rg.fr-par.scw.cloud/imazsak/imazsak-client:${env.GIT_COMMIT}"
        script {
          withDockerRegistry(credentialsId: 'scaleway-imazsak-registry', url: 'https://rg.fr-par.scw.cloud/imazsak') {
            docker.image("rg.fr-par.scw.cloud/imazsak/imazsak-client:${env.GIT_COMMIT}").push()
          }
        }
      }
    }
    stage('Stage Deploy') {
      steps {
        script {
          sshagent (credentials: ['github-jenkins-imazsak']) {
            sh """
              GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no" git clone git@github.com:Ksisu/imazsak-stage-infra.git infra && cd infra
              sed -i "s|\\(image: rg.fr-par.scw.cloud/imazsak/imazsak-client\\).*|\\1:${env.GIT_COMMIT}|" ./client/client.yml
              git add ./client/client.yml
              git config user.email "ci@imazsak.hu"
              git config user.name "Jenkins"
              git commit -m "Upgrade client ${env.GIT_COMMIT}" || true
              git push master
            """
          }
          sshagent (credentials: ['imazsak-stage-vm']) {
            sh """
              ssh -o StrictHostKeyChecking=no root@stage.imazsak.hu "cd /opt/imazsak-stage && git pull && docker stack deploy --compose-file ./client/client.yml --with-registry-auth --prune client"
            """
          }
        }
      }
    }
  }
}
