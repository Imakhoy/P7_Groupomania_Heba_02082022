const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet")
const path = require("path");

//MIDDLEWARE
const auth = require("./middleware/auth");

const app = express();

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

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

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//JWT
app.get("/jwtid", auth.requireAuth, (req, res) => {
  res.status(200).send(req.auth.userId);
});

//ROUTES
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
