const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: false },
    content: { type: String, required: true },
    imageUrl: { type: String, required: false},
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
  
  