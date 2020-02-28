const { Router } = require('express');
const router = Router();

const {
    renderSignUpForm,
    renderSigninForm,
    signin,
    signup,
    logout
} = require('../controllers/users.controller');

router.get('/signup', renderSignUpForm);

router.post('/users/signup', signup);

router.get('/signin', renderSigninForm);

router.post('/users/signin', signin);

router.get('/logout', logout);


module.exports = router;