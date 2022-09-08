// Framework node.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// Helmet sécurise les requêtes HTTP, les en-têtes...
const helmet = require('helmet');
const cors = require("cors");

// Créer un token d'identification
const jwt = require('jsonwebtoken');

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


//DATABASE
// Connecter Mongoose avec route MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// CORS ==> Cross Origin Ressource Sharing
//Import du middleware qui permet d'accéder à l'API avec les méthodes pour envoyer les requêtes


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});


const app = express();
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(helmet());

module.exports = app;