const app = require('../config/firebase')
const datetime = require('node-datetime');
var validator = require("email-validator");


const {
    query, where,startAt, orderBy,endAt,equalTo,
    getFirestore, collection, onSnapshot,getDoc,
    addDoc,getDocs, deleteDoc, doc, Firestore, limit,
    } = require('firebase/firestore');
const {getAuth,sendSignInLinkToEmail,
    createUserWithEmailAndPassword, 
    signOut, 
    signInWithEmailAndPassword
    } =  require('firebase/auth');

// init services
const db = getFirestore(app);
const auth = getAuth(app);



// routes


// Home
module.exports.Home = async(req, res) => {

    // get number of stores
    const queryRef = query(collection(db, 'stores'))
    const querySnapshot = await getDocs(queryRef); 
    let i = 0;
    let v = 0;
    querySnapshot.forEach((doc) => {
        if(doc.data().validation == true){ v++ }
        i++;
    });

    // get number of user



    // get top stores

    const queryR = query(collection(db, 'stores'), orderBy('rater', "desc"))
    const topstores = await getDocs(queryR);
    const records = [] 
    const icons = [];
    const id = []
    let j = 0;
    topstores.forEach( async (doc) => { 
        if(doc.data().rating > 0 ){
            if(j < 6){            
                
                    const cate = doc.data().category;
                    const querycat = query(collection(db, 'category'), where("name", "==", cate))
                    const category = await getDocs(querycat);
                    if(category.empty){
                        console.log('no data')
                    }
                    else{
                    category.forEach((record) => {
                        icons[j] = record.data().icon;
                        records[j] = doc.data();
                        id[j] = doc.id;
                        j++;
                    })
                    }

                    
                    
                    
                    
                
            }
        }    
        
    
     
    });

    // get categories
    const querycat = query(collection(db, 'category'))
    const category = await getDocs(querycat);
    const categ = [];
    const icon = [];
    let c= 0;
    category.forEach((record) => {
        categ[c] = record.data();
        c++
    })
    
   
    cards = ["card1", "card2", "card3"]
    
    res.render('home', {StoreN: i, StoreV: v, records, id , categories: categ, icons, cards })
  }


 // search with cateqory

 module.exports.CreateStore_get = async(req, res) => {
    const querycat = query(collection(db, 'category'))
    const querywilaya = query(collection(db, 'wilaya'), orderBy('mat', "asc"));
    const category = await getDocs(querycat);
    const wilaya = await getDocs(querywilaya);
    const categ = [];
    var name = [];
    var mat = [];
    let c= 0;
    let b= 0;
    category.forEach((record) => {
        categ[c] = record.data().name;
        c++
    });
    wilaya.forEach((record) => {
        name[b] = record.data().name;
        mat[b] = record.data().mat;
        b++
    })
          

      res.render('form', {categ, wilaya: name, matr: mat })
        
    
 }

 module.exports.CreateStore_post = (req, res) => {
    var dt = datetime.create();
    var createdAt = dt.format('ymd');
    const {name, email, desc, loc_s, loc_t, loc_w, category} = req.body;
    const phone = parseInt(req.body.phone)
    const br_number = parseInt(req.body.br_number)
    const rating = parseInt(req.body.rating)
    const rater = parseInt(req.body.rater)
    const email_v = false;
    const phone_v = false;
    const photo_url="";
    const validation = false;
    const user_id = '';
    addDoc(collection(db, 'stores'),{
        user_id, name, category, desc, loc_w, loc_t, loc_s, br_number, email, phone, createdAt, email_v, phone_v, photo_url, rater, rating, validation
    }).then(() => {
        res.send({msg: 'store created'});
    }).catch((err) => {
        res.send({error: error.message})
    })

}



// feedback post

module.exports.Feedback = (req, res) => {
    const {name, email, message} = req.body;
    try {

        // field verifivation
        if(name == null || email == null || message == null){
            throw Error('emty fields')
        }
        if(name == "" || email == "" || message == ""){
            throw Error('empty fields')
        }
        if( name.length < 4){
            throw Error('invalid name')
        }
        if(!validator.validate(email)){
            throw Error('invalid email')
        }
        if(message.length < 15){
            throw Error('invalid message')
        }
        else{
            var dt = datetime.create();
            var createdAt = dt.format('ymd');
            
            addDoc(collection(db, 'feedback'),{ name, email, message, createdAt }).then(() => {
                const data = { "header": "تم إرسال الرسالة  بنجاح", "content": 'شكرا على تواصلك معنا'}           
                for(let i=0; i< 2000000000; i++){
                    let s = 2;
                }; 
            res.status(200).json({ data})
            }).catch((err) => {
                console.log({error: error.message})
            })          
        }
    } catch (error) {
        if(error.message == "empty fields"){
        res.status(400).json({error: {header: "يجب ملأ كل الفراغات", content: "لم يتم ملأ أحد الفراغات"}})
        }if(error.message == "invalid name"){
        res.status(400).json({error: {header: "الاسم غير صحيح", content: "يرجى إدخال إسم صحيح"}})
        }
        if(error.message == "invalid email"){
        res.status(400).json({error: {header: "البريد الإلكتروني غير صحيح", content: "يرجى إدخال بريد إلكتروني صحيح"}})
        }
        if(error.message == "invalid message"){
        res.status(400).json({error: {header: "رسالة غير مقبولة", content: "يرجى إدخال رسالة صحيحة"}})
        }
    }
}


// search by category

module.exports.Search_Category_Get = (req, res) => {
    console.log(req.params)
    res.send({data: req.params.category})
}

// get commune 

module.exports.Post_commune =  async (req, res) => {
    try {
        
            const wilaya = req.body.wilaya;
            const querycommune = query(collection(db, 'commune'), where('wilaya', "==", wilaya));
            const commune = await getDocs(querycommune);
            const comm = [];
            let i = 0;
            commune.forEach((record) => {
                comm[i] = record.data().name;
                console.log(comm[i] );
                i++
            });
            res.status(200).json({commune: comm})
    
    } catch (error) {
        console.log(error)
    }
}
   