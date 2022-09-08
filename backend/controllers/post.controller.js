const mongoose = require('mongoose');
const fs = require('fs');

const User = require("../models/user.model");
const Post = require("../models/post.model");

// Création du post
// Récupération des posts
// Récupération d'un post
// Modification d'un post
// Suppression d'un post

// Gestion des likes
exports.likePost = (req, res, next) => {
    let like = req.body.like;
  
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        switch (like) {
          case 1:
            if (
              post.usersDisliked.includes(req.body.userId) &&
              !post.usersLiked.includes(req.body.userId)
            ) {
              Post.updateOne(
                { _id: req.params.id },
                {
                  $pull: { usersDisliked: req.body.userId },
                  $push: { usersLiked: req.body.userId },
                  $inc: { dislikes: -1, likes: +1 },
                }
              )
                .then(() => res.status(200).json({ message: "Dislike enlevé" }))
                .catch((error) => res.status(400).json(error));
            } else if (!post.usersLiked.includes(req.body.userId)) {
              Post.updateOne(
                { _id: req.params.id },
                { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } }
              )
                .then(() => res.status(200).json({ message: "Like ajouté" }))
                .catch((error) => res.status(400).json(error));
            }
  
            break;
  
          case -1:
            if (
              post.usersLiked.includes(req.body.userId) &&
              !post.usersDisliked.includes(req.body.userId)
            ) {
              Post.updateOne(
                { _id: req.params.id },
                {
                  $pull: { usersLiked: req.body.userId },
                  $push: { usersDisliked: req.body.userId },
                  $inc: { likes: -1, dislikes: +1 },
                }
              )
                .then(() => res.status(200).json({ message: "Like enlevé" }))
                .catch((error) => res.status(400).json(error));
            } else if (!post.usersDisliked.includes(req.body.userId)) {
              Post.updateOne(
                { _id: req.params.id },
                {
                  $push: { usersDisliked: req.body.userId },
                  $inc: { dislikes: +1 },
                }
              )
                .then(() => res.status(200).json({ message: "Dislike ajouté" }))
                .catch((error) => res.status(400).json(error));
            }
            break;
  
          case 0:
            if (post.usersDisliked.includes(req.body.userId)) {
              Post.updateOne(
                { _id: req.params.id },
                {
                  $pull: { usersDisliked: req.body.userId },
                  $inc: { dislikes: -1 },
                }
              )
                .then(() => res.status(200).json({ message: "Dislike enlevé" }))
                .catch((error) => res.status(400).json(error));
            }
            if (post.usersLiked.includes(req.body.userId)) {
              Post.updateOne(
                { _id: req.params.id },
                {
                  $pull: { usersLiked: req.body.userId },
                  $inc: { likes: -1 },
                }
              )
                .then(() => res.status(200).json({ message: "Like enlevé" }))
                .catch((error) => res.status(400).json(error));
            }
            break;
        }
      })
      .catch((error) => res.status(500).json(error));
  };