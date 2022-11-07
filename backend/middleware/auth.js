const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = null;
  if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
  }  // Récupération du token de l'user
  if (token) {
      const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`); // Vérification de la validité du token
      const userId = decodedToken.userId; // Récupération de l'userID dans le token
      req.auth = {
          userId: userId
      };
      next();
  } else {
      res.status(401).json({error: 'Utilisateur non connecté' });

  }
};

module.exports.requireAuth = (req, res, next) => {
  let token = null;
  if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
  }
  if (token) {
      jwt.verify(token, `${process.env.SECRET_TOKEN}`, async (err, decodedToken) => {
          if (err) {
              console.log(err);
              res.send(200).json('No token')
          } else {
              const userId = decodedToken.userId; // Récupération de l'userID dans le token
              req.auth = {
                  userId: userId
              };
              next();
          }
    });
  } else {
      res.status(401).json({error: 'Utilisateur non connecté' });
  }
};