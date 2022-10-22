const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  date : { type: String, required: true },
  postText: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  usersLiked: { type: [ "String <userId>" ], required: true },
});

module.exports = mongoose.model('post', postSchema);