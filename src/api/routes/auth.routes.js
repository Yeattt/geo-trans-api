const router = require('express').Router();

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { signUp, signIn } = require('../controllers/auth.controller');

router.post('/signup', [
   check('email', 'Invalid email format').isEmail(),
   check('contrasena', 'The password must be bigger than 4 digits').isLength({ min: 4 }),
   validateFields
], signUp);
router.post('/signin', signIn);

module.exports = router;