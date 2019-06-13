var express = require('express');
var router = express.Router();
let controllers = require('../controllers')
let passport = require('passport')


/* GET home page. */
router.get('/', controllers.HomeController.index);
router.get('/auth/signup', controllers.userController.getSignUp);
router.post('/auth/signup', controllers.userController.postSignUp);
router.get('/auth/signin', controllers.userController.getSignIn);
router.post('/auth/signin', passport.authenticate('local', {
  successRedirect:'/', //direccion donde redirige si esta ok
  failureRedirect:'/auth/signin',//direcc si falla
  failureFlash: true
}));
router.get('/auth/logout', controllers.userController.logout);


module.exports = router;
