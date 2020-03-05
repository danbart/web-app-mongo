const usersCtrl = {};

const User = require('../models/user');

const passport = require('passport');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async(req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'passwords do not match' })
    }
    if (password.length < 4) {
        errors.push({ text: 'Passwords must be at latest 4 characters' })
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email
        });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use.');
            res.redirect('/signup');
        } else {
            const newUser = new User({ name, email, password })
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg', 'You are Registered');
            res.redirect('/signin')
        }
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin')
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/signin',
    successRedirect: '/notes',
    // si tenemos el error usaremos flash
    failureFlash: true
})

usersCtrl.logout = (req, res) => {
    // función de passport para serrar la sesión
    req.logout();
    req.flash('success_msg', 'You are logout out now')
    res.redirect('/signin');
}

module.exports = usersCtrl;