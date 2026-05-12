pipeline {
  agent any

  environment {
    DOCKER_IMAGE_NAME = "alii007/mon-image"
    DOCKER_REGISTRY_CREDENTIALS = "dockerhub-creds"
  }

  stages {

    stage('Checkout from GitHub') {
      steps {
        git url: 'https://github.com/AliEllouzi/cicd-projet', branch: 'main'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build("${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}")
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', DOCKER_REGISTRY_CREDENTIALS) {
            dockerImage.push()
            dockerImage.push("latest")
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          withCredentials([file(credentialsId: 'kubeconfig-prod', variable: 'KUBECONFIG')]) {
            bat 'kubectl version'
            bat "kubectl set image deployment/mon-appli mon-conteneur=${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}"
            bat 'kubectl rollout status deployment/mon-appli'
          }
        }
      }
    }

  }

  post {
    failure {
      echo "Le pipeline a echoue."
    }
    success {
      echo "Deploiement reussi avec l image ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}"
    }
  }
}
