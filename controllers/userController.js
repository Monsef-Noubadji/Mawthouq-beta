const app = require('../config/firebase')
const datetime = require('node-datetime');
var validator = require("email-validator");
const jwt = require('jsonwebtoken');
const { phone } = require('phone');
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



const {
    query, where, startAt, orderBy, endAt, equalTo,
    getFirestore, collection, onSnapshot, getDoc,
    addDoc, getDocs, deleteDoc, doc, Firestore, limit,
} = require('firebase/firestore');
const { getAuth, sendSignInLinkToEmail,
    createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail,
    signOut, updateProfile, setDoc,
    signInWithEmailAndPassword
} = require('firebase/auth');
const { async, stringify } = require('@firebase/util');
const { verify } = require('jsonwebtoken');

// init services
const db = getFirestore(app);
const auth = getAuth(app);




// get connexion

module.exports.Connexion = (req, res) => {
    const path = req.path;
    res.render('auth', { path });
}

// signup

module.exports.Signup_post = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    var field = [];
    var message = [];
    var i = 0

    try {

        if (name == '' || email == "" || password1 == "" || password2 == "") {

        };
        if (name == null || email == null || password1 == null || password2 == null) {

        };
        if (name.length < 4) {
            field[i] = 'name';
            message[i] = 'يرجى إدخال اسم صحيح';
            i++
        };
        if (!validator.validate(email)) {
            field[i] = 'email';
            message[i] = 'يرجى إدخال بريد إلكتروني صحيح';
            i++

        }
        if (password1.length < 6) {
            field[i] = 'password1';
            message[i] = 'يرجى إدخال كلمة مرور ب 6 أحرف أو أكثر';
            i++

        }
        if (password1 != password2) {
            field[i] = 'password2';
            message[i] = 'يرجى إدخال نفس كلمة المرور ';
            i++

        };
        console.log(field.length);
        if (field.length == 0) {
            try {
                var userCredential = await createUserWithEmailAndPassword(auth, email, password1);
                if (userCredential) {
                    console.log("user created")
                    const user = userCredential.user;
                    const id = user.uid;
                    console.log('user created', id)
                    await updateProfile(user, {
                        displayName: name,
                    });
                    await addDoc(collection(db, 'user'), { id, name, email });
                    const token = createtoken(email);
                    res.cookie('emailvalidation', token, { httpOnly: false, maxAge: maxAge * 1000 })
                    const client = { 'id': id, 'email': email, 'name': name };

                    await sendEmailVerification(auth.currentUser)
                    res.status(201).json({ created: true });

                }
            } catch (error) {
                var solution = [];
                if (error.code == 'auth/email-already-in-use') {
                    field[i] = 'email';
                    message[i] = 'يرجى إدخال بريد إلكتروني غير مستخدم ';
                    i++
                }
                else if (error.code == 'auth/network-request-failed') {
                    field[i] = 'popup';
                    message[i] = 'مشكل في الإتصال بالإنترنت';
                    solution[i] = 'تحقق من الإتصال بالإنترنت ثم أعد المحاولة مجددا'
                    i++
                }
                else if (error.code == 'auth/invalid-password') {
                    field[i] = 'password1';
                    message[i] = 'كلمة المرور غير مقبولة';
                    i++
                } if (error.code == 'auth/too-many-requests') {
                    field[i] = 'popup';
                    message[i] = 'لقد قمت بالكثير من المحاولات ';
                    solution[i] = 'أعد المحاولة لاحقا'
                    i++
                }
                console.log(field, message)

                res.status(201).json({ field, message });
            }
        }
        else res.status(201).json({ field, message }); console.log(field)


    }
    catch (error) {
        console.log('hello from catch errors')
    }
}


// login

module.exports.Login_post = async (req, res) => {
    const email = req.body.email;
    const { GetUser } = require('../controllers/adminController')
    const phoneNumber = " + 213" + email;
    const password = req.body.password;
    var field = [];
    var message = [];
    var i = 0
    console.log("Loading")



    try {

        if (email == "" || email == null) {
            field[i] = 'email';
            message[i] = 'يرجى إدخال بريد إلكتروني أو رقم هاتف';
            i++
        };
        if (password == "" || password == null) {
            field[i] = 'password';
            message[i] = 'يرجى إدخال كلمة المرور';
            i++
        };
        if (password.length < 6) {
            field[i] = 'password';
            message[i] = ' كلمة المرور خاطئة';
            i++

        }




        // if there is no error do this

        if (field.length == 0) {

            //if user connect with email
            if (validator.validate(email)) {
                try {
                    var userCredential = await signInWithEmailAndPassword(auth, email, password);
                    if (userCredential) {
                        console.log('----------------')
                        console.log(userCredential.user.phoneNumber)
                        // console.log(userCredential.providerId)
                        console.log('----------------')
                        // check if the email is verified
                        if (userCredential.user.emailVerified == false) {
                            await sendEmailVerification(auth.currentUser);
                            signOut(auth).then(() => {
                                var logged = 'emailNotVerified';
                                console.log(logged);
                                var email = userCredential.user.emailVerified;
                                var mode = 'SConfirm';
                                res.status(201).json({ logged, email, mode });
                            }).catch((error) => {
                                console.log(error);
                            });

                        }
                        // check if there is a phone Number 
                        else if (userCredential.user.phoneNumber == null) {
                            const id = userCredential.user.uid
                            // console.log(userCredential.user.uid)
                            const token = createtoken(id);
                            res.cookie('verifyNumber', token, { httpOnly: false, maxAge: maxAge * 1000 })
                            var logged = 'noPhoneNumber';
                            console.log(logged)
                            res.status(201).json({ logged });
                        }
                        else {
                            const user = userCredential.user;
                            const id = user.uid;
                            const email = user.email
                            console.log('200 OK Logged in ')
                            const token = createtoken(id);
                            res.cookie('User', token, { httpOnly: false, maxAge: maxAge * 1000 })
                            const client = { 'id': id, 'email': email, 'name': user.displayName };
                            console.log(user.emailVerified)
                            var logged = 'Connected';
                            console.log(logged)
                            res.status(201).json({ logged });
                        }
                    }
                } catch (error) {
                    var solution = []
                    if (error.code == 'auth/invalid-email') {
                        field[i] = 'email';
                        message[i] = 'بريد إلكتروني خاطئ ';
                        res.status(201).json({ field, message });

                    } if (error.code == 'auth/user-not-found') {
                        field[i] = 'email';
                        message[i] = 'بريد إلكتروني غير موجود ';
                        res.status(201).json({ field, message });

                    } if (error.code == 'auth/wrong-password') {
                        field[i] = 'password';
                        message[i] = 'كلمة المرور خاطئة ';
                        res.status(201).json({ field, message });

                    } if (error.code == 'auth/network-request-failed') {
                        field[i] = 'popup';
                        message[i] = 'مشكل في الإتصال بالإنترنت';
                        solution[i] = 'تحقق من الإتصال بالإنترنت ثم أعد المحاولة مجددا'
                        res.status(201).json({ field, message, solution });
                    } if (error.code == 'auth/too-many-requests') {
                        field[i] = 'popup';
                        message[i] = 'لقد قمت بالكثير من المحاولات ';
                        solution[i] = 'أعد المحاولة لاحقا'
                        res.status(201).json({ field, message, solution });

                    } else {
                        console.log(error.code)
                        console.log('Exception at 1')
                    }

                }
            }

            // if user connect with phone number
            else if (phone(phoneNumber).isValid) {
                const phonenumber = phone(phoneNumber);
                GetUser(auth, phonenumber.phoneNumber, password, res)

            }
            // if user input is not a valid email or a valid phone number
            else {
                res.status(201).json({ field, message }); console.log(message)
            }
        }
        // if there is errors show them.
        else {
            res.status(201).json({ field, message }); console.log(message)
        }

    }
    catch (error) {
        console.log('hello from catch errors')
        console.log(error)
    }
}





// email verification

module.exports.Email_Verification = (req, res) => {
    res.render('email-verification')
    const emailvalidation = req.cookies.emailvalidation;
    if (emailvalidation) {
        jwt.verify(emailvalidation, 'aV35sc5ySZr5687w687oiuZFNar4', async (err, decodedtoken) => {
            if (err) {
                res.redirect('/register')
            } else {
                const email = decodedtoken.id
                res.render('email-verification', { email })
            }
        })
    } else {
        res.redirect('/register')

    }

}

// verification
module.exports.Verification = (req, res) => {
    var mode = req.query.mode;
    if (mode == 'verifyEmail') {
        mode = 'تأكيد البريد الالكتروني'
    } if (mode == 'resetPassword') {
        mode = 'إعادة ضبط كلمة المرور'
    }
    if (mode == null) {
        res.redirect('/register')
    }

    else res.render('verification', { mode })


}


























// FindUserByEmail

module.exports.FindUserByEmail = async (req, res) => {
    var error = [];
    const email = req.body.email;
    var i = 0;
    if (email == "" || email == null) {
        error[i] = 'يرجى إدخال كلمة المرور';
        res.status(201).json({ error })
    };

    if (!validator.validate(email)) {
        error[i] = 'يرجى إدخال بريد إلكتروني صحيح';
        res.status(201).json({ error })
    }

    if (error == 0) {
        try {
            const queryRef = query(collection(db, 'user'), where('email', '==', email), limit(1))
            const user = await getDocs(queryRef);

            var User = [];
            user.forEach((user) => {
                User = user.data();
            })
            console.log(User)
            if (User.length == 0) {
                error[i] = 'لا يوجد أي حساب بهذا البريد الإلكتروني'
                res.status(201).json({ error })
            }
            res.status(201).json({ User })
        } catch (err) {
            console.log(err)
            res.status(201).json({ error })
        }
    }

}



// SendPasswordResetEmail

module.exports.SendPasswordResetEmail = async (req, res) => {
    const email = req.body.email;
    console.log(44)
    var done;
    try {
        await sendPasswordResetEmail(auth, email);
        done = true
        res.status(201).json({ done })

    } catch (error) {
        console.log(error)
        done = false
        res.status(201).json({ done })
    }
}