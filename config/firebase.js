const { initializeApp } = require('firebase/app');


// database configuration ..
const firebaseConfig = {
    apiKey: "AIzaSyAx1wWjRkdH705LC7CPPArDNoqq2AHPgwM",
    authDomain: "mawthouq-7308b.firebaseapp.com",
    projectId: "mawthouq-7308b",
    storageBucket: "mawthouq-7308b.appspot.com",
    messagingSenderId: "842114546984",
    appId: "1:842114546984:web:d6d38f7f072f2b95bee41d"
  };

// init firebase
const app = initializeApp(firebaseConfig)

module.exports = app;