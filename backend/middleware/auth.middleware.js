const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');
const User = require("../models/user.model");


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  }catch {
    res.status(403).json({
      error: new Error('unauthorized request')
    });
  }
};