let mysql = require('mysql');
let bcrypt = require('bcryptjs');

module.exports={
    getSignUp: function(req, res, next){
        return res.render('users/signup')
    },
        postSignUp : function(req, res, next){
        let salt = bcrypt.genSaltSync(10); //el 10 indica el numero de saltos
        // aleatorios para crear la contraseña encriptada, por lo que en la BBD
        //debemos dar minimo un varchar de 200
        let password = bcrypt.hashSync(req.body.pass, salt);//recogemos el valor y le añadimos los saltos
        let user = {
            email: req.body.email,
            nombre: req.body.nombre,
            pass: password
        };
        let config = require('.././database/config');
        let db = mysql.createConnection(config)
        db.connect();
        db.query('INSERT INTO users SET ?', user, function(err, rows, fields){
            if(err) throw err;
            db.end();
        });
        req.flash('info', 'Datos guardados en la base de datos')
        return res.redirect('/auth/signin');

    },
    getSignIn : function(req,res,next){
         return res.render('users/signin', {message:req.flash('info'), authmessage: req.flash('authmessage')});
    },
    logout : function(req,res,next){
        //esta es una llamada a la funcion logout de passport
        req.logout();
        res.redirect('/auth/signin');
    }
};