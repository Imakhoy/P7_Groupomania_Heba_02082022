const Post = require('../models/post');
const fs = require('fs');

// Fonction permetttant d'afficher tous les posts
exports.displayAllPosts = (req, res, next) => {
    Post.find()
    .then(
      (posts) => {
        res.status(200).json(posts);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };


//Fonction permettant de créer et d'enregistrer un post dans la base de données
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  delete postObject._userId;
  const post = new Post({
      ...postObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0, 
  });

  post.save()
  .then(() => { res.status(201).json({message: 'Post enregistré'})})
  .catch(error => { res.status(400).json( { error })})
};

//Fonction permettant de modifier un post déjà publié
exports.modifyPost = (req, res, next) => {
  const postObject = req.file ? {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
    
  delete postObject._userId;
  Post.findOne({_id: req.params.id})
    .then((post) => {
      if (post.userId != req.auth.userId) {
          res.status(403).json({ message : 'unauthorized request'});
      } else {
          Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
          .then(() => res.status(200).json({message : 'Post modifié!'}))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
  };

// Fonction permettant de supprimer un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id})
    .then(post => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({message: 'Non autorisé'});
      } else {
          const filename = post.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({_id: req.params.id})
            .then(() => { res.status(200).json({message: 'Post supprimé'})})
            .catch(error => res.status(401).json({ error }));
          });
        }
    })
    .catch( error => {
        res.status(500).json({ error });
    });
  };

// Fonction permettant de liker un post
exports.likePost = (req, res, next) => {
  Post.findOne({_id: req.params.id})
    .then(
      (post) => {
          if (post.usersLiked.includes(req.body.userId)) {
            res.status(401).json({ message : 'Post déjà liké'});
          } 
          else {
            post.usersLiked.push(req.body.userId);
            post.likes++;
            post.save()
              .then(() => { res.status(201).json({message: 'Post enregistré'})})
              .catch(error => { res.status(400).json( { error })});
            }
          })
              
      .catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      );
};
