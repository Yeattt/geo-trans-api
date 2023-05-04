const jwt = require('jsonwebtoken');

const validateAuth = (req, res, next) => {
   const token = req.header('x-token');

   if (!token) {
      return res.status(401).json({
         ok: false,
         err: 'You are not authorized to do this'
      });
   }

   try {
      const { uid } = jwt.verify(token, process.env.SECRET_KEY);

      req.uid = uid;
      
      next();
   } catch (error) {
      console.log(error);
      return res.stats(401).json({
         ok: false,
         err: 'Invalid token'
      });
   }
}

module.exports = {
   validateAuth
};