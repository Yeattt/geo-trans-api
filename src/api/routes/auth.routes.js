const router = require('express').Router();

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { signUp, signIn, revalidateToken } = require('../controllers/auth.controller');
const { validateAuth } = require('../middlewares/validate-auth');

router.post('/signup', [
   check('email', 'Formato de correo inválido').isEmail(),
   check('contrasena', 'La contraseña debe tener más de 4 dígitos').isLength({ min: 4 }),
   validateFields
], signUp);

router.post('/signin', signIn);

router.get('/renew', validateAuth, revalidateToken);

module.exports = router;