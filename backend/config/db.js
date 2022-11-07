//CONNEXION MONGO DB
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//DATABASE
// Connecter Mongoose avec route MongoDB
//mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
mongoose.connect("mongodb+srv://dbHeba:Mar_4569129@cluster0.zbkll.mongodb.net/groupomania?retryWrites=true&w=majority",
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


