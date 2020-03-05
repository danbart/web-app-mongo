const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// esta función es para la estrategia que node js tendra
// para leer el correo
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {
    // vamos a confirmar si existe el correo
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false, { message: 'Not User Found' });
    } else {
        // validar la contraseña
        const match = await user.matchPassword(password)
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect Password' })
        }
    }
}))

// este metodo lo usa passport para guardar el id del usuario
// eso lo guarda en la sesión del navegador
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// esta función verifica el id del usuario registrado
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})