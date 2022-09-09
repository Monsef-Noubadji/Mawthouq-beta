const datetime = require('node-datetime');
// const { initializeApp } = require('firebase/app');
// const {
//         query, where,startAt, orderBy,endAt,equalTo,
//         getFirestore, collection, onSnapshot,
//         addDoc,getDocs, deleteDoc, doc, Firestore, connectFirestoreEmulator,
//         } = require('firebase/firestore');

// // database configuration ..
// const firebaseConfig = {
//     apiKey: "AIzaSyAx1wWjRkdH705LC7CPPArDNoqq2AHPgwM",
//     authDomain: "mawthouq-7308b.firebaseapp.com",
//     projectId: "mawthouq-7308b",
//     storageBucket: "mawthouq-7308b.appspot.com",
//     messagingSenderId: "842114546984",
//     appId: "1:842114546984:web:d6d38f7f072f2b95bee41d"
//   };

// // init firebase
// const app = initializeApp(firebaseConfig)

// // init services
// const db = getFirestore(app);
// const auth = getAuth(app);


// //const { initializeApp } = require('firebase-admin/app');
// const admin = require("firebase-admin");
// const { getAuth } = require('firebase-admin/auth');


// var serviceAccount = require("../mawthouq-7308b-firebase-adminsdk-mjksx-8105f3f03d.json");

// // initializeApp({
// //   credential: admin.credential.cert(serviceAccount),
// //   databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
// // });


// admin.initializeApp({
//   databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
//   credential: admin.credential.cert({
//     "type": "service_account",
//     "project_id": "mawthouq-7308b",
//     "private_key_id": "8105f3f03d167b40592ec94953a164c374dbd5a1",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDbO/U6fQgslgg+\ntXbn8+oQUwYArXsbNjcjxhbsYmTO6FeMPwQ46S56rNkEy/rDcpT8SfLjtLbypVgo\n8cH7xNXjk7PkCdJBThbIL1CfBEooj62EgQELtNSc4a+Z1Eus+rD/RfClTjMnLZRc\nlaujV3wsnbBiDJteoiwSZ90Wtp2iC9q5RrIbkw5BKQ1MlMVLoSn0RHkuVVRRnHiT\nB/4dYKSUDzMM6U7aCZUTnCV8N1Bdxa6L30Jn6j+TxQ5Jr4sNmecg+/NndXfknBrU\nQJbdwqXnit3mPsVaQRzCymZuv+cxGH4Gt4k1aBYrLdCSdl+uvnq8b76TkbA34KMP\nAlvjtH2tAgMBAAECggEAHQ3K38Oyqd//OzpGxhIh5qRuEvhqrG5Iq+3EW3Llu7L4\naT5vs5AZiAnwn81dj/nXK0Esloc8SJdngdOaOuC43NZV/IZdrihoZgK5Oz2xC0OR\nQhJrnk7Kb3kMUcVb+xJlEwuEiw+8QTit5QAz1SuSqgIC3lef3pB86TqJBwnQBamw\nOLRaMK/JYjhTUULVxvhEiXDKM3QaGlqaJT8r0i06C0/PIIuu+aKCbes9AwRm4QYT\nfv0JHPeygRweO5NReyiRjuKQJb79mqFwrEiW12XCZk8crNk+sEqHY7gpp4fZN1Kw\n1ZRhpH3eNKXVYPJQvS7dka6sGdGU319bEm+C+W8Y2QKBgQDvtKhpxdA5SW0M/7kq\nyA3vJw6b/CjMBmYrRJNDZD5uVCMuyM4l7q1q1eMVXruOkF+Yh9wlmWMN7uIsyYjk\nGbfjtUka/G8FrdQtz561clDdlOdyS7E4vr53ZLRRv1nYWjpeFdk74p/r7JnmIbnP\ny9GGFI8YwZB3azdw81hdNyfb2QKBgQDqIw6DQUEb9Wv5iHlzJ89YI1l+1qi5iJS3\n95clqfW4STnIFPOFukMWR/XqqqwmrwD0r0MyNKh46eB51JTUOjO2X60vZ7otC/Wg\nK2RXAvsuF2wWns6dYpv7ZCCMWVh2bNGE+0JogNgTalcMcG+kEdUYbC7aHBXg3mX2\n3I/6apxv9QKBgQCHa9ftkdz2UF40htB0s/rzTmx5gXcG9OKJtT9BRoPiztPlnXqh\ngXslrVqSeyeY/kWTpcWg1Exa1cefp+gXfdQe6A86GL0cRz1k+DPgrIm09WfgcZTY\nyyJNz23z9RfsG+V3u/4zT/ArWEsF8a3JEIv5pOnHAav9W2xB+qjEWOHC2QKBgQDG\njc4r3vWxGRJk/ahI0LTUQL4Pg0h4dmvwCuZByX0Yt/hpReMyP7/OsF3KkMwGzhgY\naFyqwd8xEt0LVAyWYXkjKsX6UpOeyeqV1tZzt5J9Bt3h3PDIpSw0Jzg27TnIzAVu\nKYmqh8E1zdNeOCdk0r6MxImC65heJxv/GhJ7QVfC1QKBgHMh+DPH/uln7+RASuJx\nDSAhgg75ecalGZwkR82y0fEQiGPQG5UnpYitwRl4nxFw6G6WVJCFYZZjtcdrW7ap\nH1q1MDlX1MBEsMQTYvT1ghxo/e/jrbmAjhvAqAEp3MgohKkBovvjPtKRj9/8fmjN\nq3kcJLLyU4hWH99NvEa7NTdD\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-mjksx@mawthouq-7308b.iam.gserviceaccount.com",
//     "client_id": "111999026257967440936",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mjksx%40mawthouq-7308b.iam.gserviceaccount.com"
//   })
// });


// email validation
  module.exports.Valid_email = async (req, res) =>{

    const user = await getAuth().getUser('83MY2KUicdTeo7lrJA9oF0ax9152');
    console.log(user);
    const userEmail = 'dellihrmohammed44@gmail.com';
   
    getAuth()
      .generatePasswordResetLink(userEmail)
      .then((link) => {
        // Construct password reset email template, embed the link and send
        // using custom SMTP server.
        return sendCustomPasswordResetEmail(userEmail, displayName, link);
      })
      .catch((error) => {
        // Some error occurred.
      });

  }





// signup module ..
module.exports.Signup_gett = async (req,res) => {
    
    
  getAuth()
  .getUserByEmail('dellihrmohammed44@gmail.com')
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });
}

// signin module ..
module.exports.Signin_post = async (req,res) => {
    
    
    const { email, password } = req.body;
    console.log('user : ' , email)
    signInWithEmailAndPassword(auth, email,password).then((userCredential) => {
        if(userCredential){
            // Signed in 
            const user = userCredential.user;
            res.send(user);

            // ...
        }
        else throw error;
        
      }).catch( err =>  {
        res.send(err.message)

    })

}

// logout module
module.exports.Logout_get = (req, res) => {
    signOut(auth).then(() => {
        res.send({msg: 'signed out'})
      }).catch((error) => {
        res.send(error.message);
      });
}





// create store module
module.exports.CreateStore_post = (req, res) => {
    var dt = datetime.create();
    var createdAt = dt.format('ymd');
    console.log(createdAt);
    const { user_id, name, category_id, desc, loc_w, loc_t, low_s, br_number, email, phone, email_v, phone_v, photo_url, rater, rating, validation} = req.body;
    addDoc(collection(db, 'stores'),{
        user_id, name, category_id, desc, loc_w, loc_t, low_s, br_number, email, phone, createdAt, email_v, phone_v, photo_url, rater, rating, validation
    }).then(() => {
        res.send({msg: 'store created'});
    }).catch((err) => {
        res.send({error: error.message})
    })

}

// search for store module..
module.exports.SearchStore_post = async (req, res) => {
    const store = req.body.store;
    console.log(store)
    // const queryRef = query(collection(db, 'stores'),orderBy('name'), startAt('ad'), endAt("\uf8ff") )
    const queryRef = query(collection(db, 'stores'), orderBy('name'), where("name", ">=", store), where("name", "<=", store + "\uf8ff"))
    const querySnapshot = await getDocs(queryRef);
    const records = []
    let i = 0;
    querySnapshot.forEach((doc) => {
     records[i] = doc._document.data.value.mapValue.fields.name.stringValue;
     i++
    });
    res.send(records);

}


const twilio = require('twilio');
module.exports.PhoneNumber = (req, res) => {

  const accountSid = "ACdef7d808e367744cf5c458720e292264";
  const authToken = "6d9098f4e8a21ccb02dd4ff47225769c";
  const client = require('twilio')(accountSid, authToken);

  client
  .verify
  .services("VAfbfcef62516e2406ded68b430444a010")
  .verifications
  .create({
      to: "+213799782760",
      channel: 'sms' 
  }).then((data) => res.status(200).send(data))
}
module.exports.PhoneNumberValidate = (req, res) => {

  const accountSid = "ACdef7d808e367744cf5c458720e292264";
  const authToken = "6d9098f4e8a21ccb02dd4ff47225769c";
  const client = require('twilio')(accountSid, authToken);

  client
  .verify
  .services("VAfbfcef62516e2406ded68b430444a010")
  .verificationChecks
  .create({
      to: "+213799782760",
      code: '8364' 
  }).then((data) => res.status(200).send(data))
}

module.exports.Phoneview = (req, res) => {
  res.render('phone')
}