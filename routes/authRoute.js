const { Router } = require('express');
const authController = require('../controllers/authController');
const Controller = require('../controllers/Controller');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');



const router = Router();

router.post('/signup', userController.Signup_post);
router.post('/validation', adminController.Phone_post);
router.get('/validation', adminController.Phone_get);
router.post('/validationCode', adminController.ValidatePhoneNumber);
router.post('/login', userController.Login_post);
 router.get('/phone', authController.PhoneNumber);
 router.get('/phonev', authController.PhoneNumberValidate);
 router.get('/phoneview', authController.Phoneview);
router.get('/logout', authController.Logout_get);
router.post('/getStores', authController.SearchStore_post);
router.get('/valid', authController.Valid_email);
router.get('/', Controller.Home);
router.post('/create', Controller.CreateStore_post);
router.get('/create', Controller.CreateStore_get);
router.post('/feedback', Controller.Feedback);
router.get('/category/:category',Controller.Search_Category_Get)
//router.get('/wilaya', Controller.Wilaya);
router.get('/login', userController.Connexion );
router.get('/register', userController.Connexion );
router.get('/emailverification', userController.Email_Verification );
router.post('/commune', Controller.Post_commune);
router.get('/verification', userController.Verification);
router.get('/password-reset', function(req, res){res.render('password-reset')});
router.post('/findUserByEmail', userController.FindUserByEmail);
router.post('/sendPasswordResetEmail', userController.SendPasswordResetEmail);


router.get('/store', function(req, res){res.render('store')});
// router.get('/phonee', function(req, res){res.render('iindex')});


module.exports = router;