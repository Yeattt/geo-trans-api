const router = require('express').Router();

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { signUp, signIn, revalidateToken } = require('../controllers/auth.controller');
const { validateAuth } = require('../middlewares/validate-auth');

router.post('/signup', [
   check('email', 'Invalid email format').isEmail(),
   check('contrasena', 'The password must be bigger than 4 digits').isLength({ min: 4 }),
   validateFields
], signUp);

router.post('/signin', signIn);

router.get('/renew', validateAuth, revalidateToken);

module.exports = router;