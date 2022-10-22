const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const guillemetToken = req.headers.authorization.split(' ')[1];
       const token = guillemetToken.replace(/['"]+/g, '')
       const decodedToken = jwt.verify(token, 'N734H_IZEFZFBUI43_23EDSQD');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};