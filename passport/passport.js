let LocalStrategy = require('passport-local').Strategy;
let mysql = require('mysql');
let bcrypt = require('bcryptjs');


module.exports = function(passport){

    passport.serializeUser(function(user, done){
        done(null, user); // aqui se guardan los datos de inicio de sesion
    });

    passport.deserializeUser(function(obj, done){
        done(null, obj);
    });

    passport.use(new LocalStrategy({
        passReqToCallback: true
    },
    function (req, email, password, done) {
        console.log(password)
        console.log(done)
        let config = require('.././database/config');
        //nos conectamos a la BDD
        let db = mysql.createConnection(config);
        db.connect();

        db.query('SELECT * FROM users WHERE email = ?', email, function (err, rows, fields) {
            if (err) throw err;
            db.end();
            if (rows.length > 0) {
                //datos del usuario
                let user = rows[0];
                console.log(user)
                if (bcrypt.compareSync(password, user.pass)) {
                    console.log(password)
                    return done(null, {
                        id: user.id,
                        nombre: user.nombre,
                        email: user.email
                    });
                }
            }
            //retornamos un error
            return done(null, false, req.flash('authmessage', 'Email o Password incorrecto'));
        });
    }));
};
