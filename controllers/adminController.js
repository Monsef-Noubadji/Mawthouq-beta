const datetime = require('node-datetime');
var validator = require("email-validator");
const jwt = require('jsonwebtoken');
const {phone} = require('phone');
const twilio = require('twilio');
const request = require('request')

 //  twillio config
 const accountSid = "ACdef7d808e367744cf5c458720e292264";
 const authToken = "6d9098f4e8a21ccb02dd4ff47225769c";
 const client = require('twilio')(accountSid, authToken);

 //create token
const maxAge = 60 * 60 * 24 * 3
const createtoken = (id) => {
    return jwt.sign({ id }, 'aV35sc5ySZr5687w687oiuZFNar4', { expiresIn: maxAge })
};

// admin sdk config
const admin = require("firebase-admin");
const { getAuth } = require('firebase-admin/auth');
const { signInWithEmailAndPassword } = require('firebase/auth');

const adminApp = admin.initializeApp({
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "mawthouq-7308b",
    "private_key_id": "8105f3f03d167b40592ec94953a164c374dbd5a1",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDbO/U6fQgslgg+\ntXbn8+oQUwYArXsbNjcjxhbsYmTO6FeMPwQ46S56rNkEy/rDcpT8SfLjtLbypVgo\n8cH7xNXjk7PkCdJBThbIL1CfBEooj62EgQELtNSc4a+Z1Eus+rD/RfClTjMnLZRc\nlaujV3wsnbBiDJteoiwSZ90Wtp2iC9q5RrIbkw5BKQ1MlMVLoSn0RHkuVVRRnHiT\nB/4dYKSUDzMM6U7aCZUTnCV8N1Bdxa6L30Jn6j+TxQ5Jr4sNmecg+/NndXfknBrU\nQJbdwqXnit3mPsVaQRzCymZuv+cxGH4Gt4k1aBYrLdCSdl+uvnq8b76TkbA34KMP\nAlvjtH2tAgMBAAECggEAHQ3K38Oyqd//OzpGxhIh5qRuEvhqrG5Iq+3EW3Llu7L4\naT5vs5AZiAnwn81dj/nXK0Esloc8SJdngdOaOuC43NZV/IZdrihoZgK5Oz2xC0OR\nQhJrnk7Kb3kMUcVb+xJlEwuEiw+8QTit5QAz1SuSqgIC3lef3pB86TqJBwnQBamw\nOLRaMK/JYjhTUULVxvhEiXDKM3QaGlqaJT8r0i06C0/PIIuu+aKCbes9AwRm4QYT\nfv0JHPeygRweO5NReyiRjuKQJb79mqFwrEiW12XCZk8crNk+sEqHY7gpp4fZN1Kw\n1ZRhpH3eNKXVYPJQvS7dka6sGdGU319bEm+C+W8Y2QKBgQDvtKhpxdA5SW0M/7kq\nyA3vJw6b/CjMBmYrRJNDZD5uVCMuyM4l7q1q1eMVXruOkF+Yh9wlmWMN7uIsyYjk\nGbfjtUka/G8FrdQtz561clDdlOdyS7E4vr53ZLRRv1nYWjpeFdk74p/r7JnmIbnP\ny9GGFI8YwZB3azdw81hdNyfb2QKBgQDqIw6DQUEb9Wv5iHlzJ89YI1l+1qi5iJS3\n95clqfW4STnIFPOFukMWR/XqqqwmrwD0r0MyNKh46eB51JTUOjO2X60vZ7otC/Wg\nK2RXAvsuF2wWns6dYpv7ZCCMWVh2bNGE+0JogNgTalcMcG+kEdUYbC7aHBXg3mX2\n3I/6apxv9QKBgQCHa9ftkdz2UF40htB0s/rzTmx5gXcG9OKJtT9BRoPiztPlnXqh\ngXslrVqSeyeY/kWTpcWg1Exa1cefp+gXfdQe6A86GL0cRz1k+DPgrIm09WfgcZTY\nyyJNz23z9RfsG+V3u/4zT/ArWEsF8a3JEIv5pOnHAav9W2xB+qjEWOHC2QKBgQDG\njc4r3vWxGRJk/ahI0LTUQL4Pg0h4dmvwCuZByX0Yt/hpReMyP7/OsF3KkMwGzhgY\naFyqwd8xEt0LVAyWYXkjKsX6UpOeyeqV1tZzt5J9Bt3h3PDIpSw0Jzg27TnIzAVu\nKYmqh8E1zdNeOCdk0r6MxImC65heJxv/GhJ7QVfC1QKBgHMh+DPH/uln7+RASuJx\nDSAhgg75ecalGZwkR82y0fEQiGPQG5UnpYitwRl4nxFw6G6WVJCFYZZjtcdrW7ap\nH1q1MDlX1MBEsMQTYvT1ghxo/e/jrbmAjhvAqAEp3MgohKkBovvjPtKRj9/8fmjN\nq3kcJLLyU4hWH99NvEa7NTdD\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-mjksx@mawthouq-7308b.iam.gserviceaccount.com",
    "client_id": "111999026257967440936",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mjksx%40mawthouq-7308b.iam.gserviceaccount.com"
  })
});

module.exports = adminApp;



// --- phone view ---
module.exports.Phone_get = (req, res) =>{
  res.render('phone')
}




// --- send otp to validate phone number ---


module.exports.Phone_post = async (req, res) =>{
    console.log(req.body)
   if (!req.body.captcha)
   return res.status(400).json({ success: false,'error': 'ربما أنت برنامج روبوت', "message": 'اختار أنا لست برنامج روبوت' });
 // Secret key
 const secretKey = '6LfeKgYgAAAAAOx_oSYYlHERZ6QXjN4o_z9dwdcu';

 // Verify URL

 const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

 // Make a request to verifyURL

 request(verifyURL, async (err, response, body) => {

     body = JSON.parse(body);
      console.log(body)
     if(body.success !== undefined && !body.success){
         res.status(400).json({"success": false,"error": 'فشل التأكد من أنك لست روبوت', "message": " أعد تحميل الصفحة ثم أعد المحاولة"})
     }
     else {
      const phoneNumber = phone("+213" + req.body.phoneNumber)
      console.log(phoneNumber)
      if(phoneNumber.isValid == true){
        
            try {
              const message =  await client
                  .verify
                  .services("VAfbfcef62516e2406ded68b430444a010")
                  .verifications
                  .create({
                      to: phoneNumber.phoneNumber,
                      channel: 'sms' 
                  });
                  res.status(200).json({'success':true, 'phone':phoneNumber.phoneNumber })
          } catch (error) {
              var errorMessage;
              var errorError; 
              if(error.code){
                  if(error.code == 60200){
                      errorMessage = "رقم الهاتف خاطئ"
                      errorError = "أدخل رقم هاتف صحيح"
                  }if(error.code == 60201){
                      errorMessage = "Invalid verification code"
                  }if(error.code == 60202){
                      errorMessage = "Max check attempts reached"
                  }if(error.code == 60203){
                      errorMessage = "Max send attempts reached"
                  }if(error.code == 60204){
                      errorMessage = "Service does not support this feature"
                  }if(error.code == 60205){
                      errorMessage = "SMS is not supported by landline phone number"
                  }if(error.code == 60206){
                      errorMessage = "'Amount' & 'Payee' params are required"
                  }
                  res.status(400).json({'success': false, 'error': errorError, 'message': errorMessage})
              }
 
            } } else   res.status(400).json({'success': false, 'error': 'رقم الهاتف خاطئ', 'message': "أدخل رقم هاتف صحيح"})

    }
})
}


// --- confirm phone code ---

module.exports.ValidatePhoneNumber =async (req, res) => {

    // verify token
    //console.log('555')
    const verifyNumber = req.cookies.verifyNumber;
    if(verifyNumber){
    //console.log('555')
        jwt.verify(verifyNumber, 'aV35sc5ySZr5687w687oiuZFNar4', async (err, decodedtoken)=> {
            if(err) {
                var phoneResponse = 'noTokenValid'
                res.status(200).json({phoneResponse})
            } else {
            //console.log('666')
            //console.log(decodedtoken)
            const id =  decodedtoken.id  
            //console.log(req.body) 
            const phoneNumber = req.body.phoneNumber;
            const code = req.body.code;
            try {
                const message =  await client
                .verify
                .services("VAfbfcef62516e2406ded68b430444a010")
                .verificationChecks
                .create({
                    to: phoneNumber,
                    code: code
                });
                if(message.valid == true){
                    // ---- now i have to add the phone number to the data base before i send the response
                    //          console.log(phoneNumber)
                getAuth()
                    .updateUser(id, {
                        phoneNumber: phoneNumber ,
                    })
                    .then((userRecord) => {
                        // See the UserRecord reference doc for the contents of userRecord.
                        console.log('the phone number Successfully updated ');
                    }).catch((error) => {
                        console.log('Error fetching user data:', error);
                    });

                 
                    var logged = 'addedSuccess'
                    const token = createtoken(id);
                    res.cookie('User', token, { httpOnly: false, maxAge: maxAge * 1000 })
                    res.status(200).json({logged})
                }
                if(message.valid == false || !message){
                    res.status(400).json({'success': false, 'error': "الكود خاطئ", 'message':"تحقق من الكود  مجددا"})

                }
                
            } catch (error) {
                    if(error.code == 60201){
                        errorMessage = "الكود خاطئ"
                        errorError = "تحقق من الكود  مجددا"
                    }if(error.code == 60202){
                        errorMessage = "تم الوصول إلى الحد الأقصى من محاولات الفحص"
                        errorError = "قم بإرسال الكود مجددا"
                    }if(error.code == 60203){
                        errorMessage = "وصلت محاولات الإرسال القصوى"
                        errorError = "قم بإرسال الكود مجددا"    
                    }if(error.code == 20404){
                        errorMessage = "حدث خطأ"
                        errorError = "قم بإرسال الكود مجددا"
                    }else{
                        errorMessage = error.code
                        errorError = error.message
                        console.log(error)
                    }
                    res.status(400).json({'success': false, 'error': errorError, 'message': errorMessage})
                }
                    }
        })
    }else {
        res.redirect('/register')
    }
}

// get user email using phone number
module.exports.GetUser = async (auth, phone, password, res) =>{
    console.log("phone: ",phone)
    //   getAuth()
    //       .getUserByEmail('dellihrmohammed44@gmail.com')
    //       .then((userRecord) => {
    //           // See the UserRecord reference doc for the contents of userRecord.
    //           console.log(userRecord);
    //       })
    //       .catch((error) => {
    //           console.log('Error fetching user data:', error);
    //      });
        //  getAuth()
        //      .updateUser('1dT3i1H4DUgMNU14zMBq5Qbw2JZ2', {
        //          phoneNumber: '+213558814957',
        //      })
        //      .then((userRecord) => {
        //          // See the UserRecord reference doc for the contents of userRecord.
        //          console.log('Successfully updated user');
        //      }).catch((error) => {
        //          console.log('Error fetching user data:', error);
        //      });


     getAuth()
         .getUserByPhoneNumber(phone)
         .then((userRecord) => {
             // See the UserRecord reference doc for the contents of userRecord.
             const email = userRecord.email
             console.log(email);
             console.log(password);
             signInWithEmailAndPassword(auth, email, password).then((data)=>{
                 const id = data.uid;
                 console.log("connected");
                 const token = createtoken(id);
                 res.cookie('User', token, { httpOnly: false, maxAge: maxAge * 1000 })
                 var logged = true;
                 res.status(201).json({ logged });
             }).catch((error) => {
                console.log('Error:', error);
            });
         })
         .catch((error) => {
             console.log('Error fetching user data:', error);
         });
  }