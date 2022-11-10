//REQUIRE
/*
//const PostModel = require('../models/post.models');
//const ObjectID = require("mongoose").Types.ObjectId;
//const { uploadErrors } = require("../utils/errors.utils");
const Post = require('../models/post.mpdels');
const { postErrors } = require('../utils/errors.utils')
const fs = require('fs');
//const { promisify } = require("util");
//const pipeline = promisify(require("stream").pipeline);


exports.createPost = (req, res) => {
  const postObject = req.file ? {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body,
      imageUrl: `` 
  }
  delete postObject._id;
  delete postObject._userId;
  const post = new Post({
      ...postObject,
      userId: req.auth.userId,
      likes: 0,
      dislikes: 0
  });
  post.save()
  .then(() => { res.status(201).json({message: 'Post enregistré !'})})
  .catch(err => {
      const error = postErrors(err)
      res.status(400).json({ error })
    });
};

exports.modifyPost = (req, res) => {
  const isAdmin = req.body.isAdmin
  const updatePost = req.file ? {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body,
      imageUrl: ``  };

  delete updatePost._userId;
  Post.findOne({_id: req.params.id})
      .then((post) => {
          if (post.userId === req.auth.userId || isAdmin === "true"){
              Post.updateOne({ _id: req.params.id}, { ...updatePost, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Post modifié!'}))
              .catch(err => {
                  const error = postErrors(err)
                  res.status(400).json({ error })
                });
          } else {
                      res.status(401).json({ message : 'Non autorise'});
          }})
      .catch((error) => {
          res.status(400).json({ error });
      });
};

exports.deletePost = (req, res) => {
  const isAdmin = req.body.isAdmin
  Post.findOne({ _id: req.params.id})
      .then(post => {
          if (post.userId === req.auth.userId || isAdmin === true){
              const filename = post.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Post.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Post supprimée !'})})
                      .catch(error => res.status(401).json({ error }));
          })} else {
              res.status(401).json({message: 'Non autorise'});
          }})
      .catch( error => {
          res.status(500).json({ error });
      });
};

// si 1 like, si -1 dislike 
exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id})
  .then(post => {
      let user = req.auth.userId;

      if (req.body.like == 1) {
          if (!post.usersLiked.includes(user)){
              if (!post.usersDisliked.includes(user)){
                      post.likes++;
                      post.usersLiked.push(user);
              } else {
                  post.likes++;
                  post.usersLiked.push(user);
                  post.dislikes--;
                  post.usersDisliked.splice(post.usersDisliked.indexOf(user), 1);
              }
          } else {
              post.likes--;
              post.usersLiked.splice(post.usersLiked.indexOf(user), 1);
          }
      };

      if (req.body.like == -1) {
          if (!post.usersDisliked.includes(user)){
              if (!post.usersLiked.includes(user)){
                      post.dislikes++;
                      post.usersDisliked.push(user);
              } else {
                  post.dislikes++;
                  post.usersDisliked.push(user);
                  post.likes--;
                  post.usersLiked.splice(post.usersLiked.indexOf(user), 1);
              }
          } else {
              post.dislikes--;
              post.usersDisliked.splice(post.usersDisliked.indexOf(user), 1);
          }
      };

      post.save();
      res.status(200).json({message: 'Changement like pris en compte'})
  })
  .catch( error => {
      res.status(500).json({ error });
  });
};

*/