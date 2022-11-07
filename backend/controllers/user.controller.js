//REQUIRES
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

//CREATION DE COMPTE
exports.signup = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        bcrypt.genSalt(parseInt(process.env.SALT))
        .then(salt => {
            bcrypt.hash(req.body.password, salt)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                });
                user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
      } else {
        res.status(401).json({error: 'Cet utilisateur existe déjà !'})
      }
    })
};

//CONNEXION AU COMPTE
exports.signin = (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        let token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true});
        res.status(200).json({
          userId: user._id,
          token: token
        });
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};
  const createToken = (userId) => {
  return jwt.sign({userId: userId}, process.env.SECRET_TOKEN, {expiresIn: '24h' });
}

//DECONNEXION
exports.logout = (req, res) => {
  res.cookie('jwt', '', {expiresIn: '24h' });
  res.status(200).json({message: 'Utilisateur déconnecté !'})
}


