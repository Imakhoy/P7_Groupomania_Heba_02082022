const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { signUpError } = require('../utils/errors.utils');

const User = require("../models/user.model");

//Authentification
//Creation du compte utilisateur
exports.signup = (req, res, next) => {
  bcrypt.genSalt(parseInt(process.env.SALT))
  .then(salt=>{
    bcrypt.hash(req.body.password, salt)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        user.save()
        .then(() =>
            res.status(201).json({ message: "Compte utilisateur créé !" })
          )
          .catch((err) => {
            const error = signUpError(err);
            res.status(400).json({ error });
          });
      })
      .catch((error) => res.status(500).json({ error }));
    })
  };
  
  // Connexion de l'utilisateur
  const maxAge = 7 * 24 * 60 * 60 * 1000;
  const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};
exports.login = (req, res, next) => {
    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: "Mot de passe incorrect !" });
            }
            const token = createToken(user._id);
            res.cookie("jwt", token, { httpOnly: true }, maxAge);
            res.status(200).json({ user: user._id });
          })
          .catch((error) => res.status(501).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };
  
  exports.logout = (req, res, next) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "Utilisateur déconnecté !" });
  };

  //Récupérer les utilisateurs
  exports.getAllUsers = (req, res, next) => {
    User.find()
      .select("-password")
      .then((users) => {
        const numberOfUsers = users.length;
        for (let i = 0; i < numberOfUsers; i++) {
          const filename = users[i].picture.split("./images/users/")[1];
          if (fs.existsSync(`images/users/${filename}`)) {
          } else {
            users[i].picture = `${req.protocol}://${req.get(
              "host"
            )}/public/default-image.png`;
          }
        }
        res.status(200).json(users);
      })
      .catch((error) => res.status(401).json(error));
  };
  //Récupérer un utilisateur
  exports.getUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .select("-password")
      .then((user) => {
        const filename = user.picture.split("images/users")[1];
        if (fs.existsSync(`images/users/${filename}`)) {
        } else {
          user.picture = `${req.protocol}://${req.get(
            "host"
          )}/public/default-image.png`;
        }
        res.status(200).json(user);
      })
      .catch((error) => res.status(401).json(error));
  };


      
// Suppression du compte utilisateur

exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (user._id != req.auth.userId) {
          res.status(401).json({ message: "non autorisé !" });
        } else {
          const filename = user.picture.split("./images/users/")[1];
          fs.unlink(`images/users/${filename}`, () => {
            User.deleteOne({ _id: req.params.id })
              .then(() =>
                res.status(200).json({ message: "Compte utilisateur supprimé !" })
              )
              .catch((error) => res.status(400).json(error));
          });
        }
      })
      .catch((error) => res.status(500).json(error));
  };