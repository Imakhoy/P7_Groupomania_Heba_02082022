const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        userId: { type: String, required: true},
        title: { type: String, required: true},
        content: { type: String, required: true},
        imageUrl : { type: String, required: true},
        likes: { type: Number, required: true, default: 0},
        usersLiked: { type: [String], required: true, default: []},
    },
    {
        timestamps: true,
        collection: 'posts'
    }
);

module.exports = mongoose.model('Post', postSchema);