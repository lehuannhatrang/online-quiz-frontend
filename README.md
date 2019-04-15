online-quiz-frontend

To run: Start the online-quiz-backend first
    * Run on localhost: 
        npm install
        npm run start:dev

    * Run on docker: 
        bash ./serve.sh

To login success, after run online-quiz-backend, run these command to terminal:

    * If online-quiz-backend run on localhost:
        mongo --port 27017
    * If online-quiz-backend run on docker:
        mongo --port 27019

    After connect to mongo command line, type these command:

        *   use online-quiz
        *   show collections
        *   db.user.insert({user: "huandeptrai", password: "huandeptrai", status: "ACTIVATED"}) 

    Finnally, type http://localhost:5000 or http://onlinequiz.com on browser and use username: "huandeptrai" and password: "huandeptrai" to login