pipeline {

  environment {
    gw_dockerimagename = "agachan/lb321-gw"
    user_dockerimagename = "agachan/lb321-user"
    capt_dockerimagename = "agachan/lb321-capt"
    ride_dockerimagename = "agachan/lb321-ride"
    gw_dockerImage = ""
    user_dockerImage = ""
    capt_dockerImage = ""
    ride_dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git 'https://github.com/qhammad99/microservices_ci_cd.git'
      }
    }

    stage('Build Gateway image') {
      steps{
        script {
            gw_dockerImage = docker.build(gw_dockerimagename, "./gateway")
        }
      }
    }

    stage('Build User image') {
      steps{
        script {
            //   dockerImage = docker.build dockerimagename
            user_dockerImage = docker.build(user_dockerimagename, "./user")
        }
      }
    }

    stage('Build Capt image') {
      steps{
        script {
            capt_dockerImage = docker.build(capt_dockerimagename, "./captain")
        }
      }
    }

    stage('Build Ride image') {
      steps{
        script {
            ride_dockerImage = docker.build(ride_dockerimagename, "./ride")
        }
      }
    }

    stage('Pushing Gateway Image') {
      environment{registryCredential='dockerhublogin'}
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            gw_dockerImage.push("v1")
          }
        }
      }
    }

    stage('Pushing User Image') {
      environment{registryCredential='dockerhublogin'}
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            user_dockerImage.push("v1")
          }
        }
      }
    }

    stage('Pushing Captain Image') {
      environment{registryCredential='dockerhublogin'}
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            capt_dockerImage.push("v1")
          }
        }
      }
    }

    stage('Pushing Ride Image') {
      environment{registryCredential='dockerhublogin'}
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            ride_dockerImage.push("v1")
          }
        }
      }
    }

    stage('Deploying App to Kubernetes') {
      steps {
        script {
          withKubeConfig([credentialsId: "kubernetes"]) {
            sh 'kubectl apply -f k8s'
          }
        }
      }
    }

  }

  post {
    success {
        mail to: 'testing@example.com',
             subject: "Build M321 Successful",
             body: "The build was successful!"
    }
    failure {
        mail to: 'testing@example.com',
             subject: "Build M321 Failed",
             body: "The build failed!"
    }
    always {
        echo 'Cleaning up resources...'
        // This block will run regardless of success or failure
    }
  }
}