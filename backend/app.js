const express = require("express");
const helmet = require("helmet");
const path = require('path');
const cookieParser = require('cookie-parser');

// ROUTES
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const auth = require('./middleware/auth');

const app = express();

// Parse requests of content-type - application/json
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// HELMET
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } },
{ crossOriginOpenerPolicy: { policy: "cross-origin" } }));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cookieParser());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// jwt
app.get('/jwtid', auth.requireAuth, (req, res) => {
  res.status(200).send(req.auth.userId)
});

// USE ROUTES
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;