const jwt = require('jsonwebtoken');

const generateJWT = (uid = '', nombre = '', roleId = '') => {
   return new Promise((resolve, reject) => {
      const payload = { uid, nombre, roleId };

      jwt.sign(payload, process.env.SECRET_KEY, {
         expiresIn: '14d'
      }, (err, token) => {
         if (err) {
            console.log(err);
            reject('Error generating the token');
         } else {
            resolve(token);
         }
      });
   });
}

module.exports = {
   generateJWT
};