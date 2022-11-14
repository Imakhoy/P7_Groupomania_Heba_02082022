const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');

// Création d'un post
exports.createPost = (req, res, next) => {

  const postObject = new Post({
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content
  })

  postObject.imageUrl = req.file ?`${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`: '';

    postObject.save()
    .then(() => { res.status(201).json({message: 'Post créé !'})})
    .catch(error => { res.status(400).json( { error })})
 };



exports.opinionPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id})
  .then(post => {
      let postObject = post;
      // L'utilisateur like
      if (req.body.like === 1) {
          if (postObject.usersLiked.indexOf(req.body.userId) === -1) {  // Vérifie si user déjà dans le tableau des likes
              postObject.usersLiked.push(req.body.userId); // Si NON Ajout de l'userID dans le tableau des likes
              postObject.likes = postObject.likes+1; // Ajout du like dans le compteur
          }
      // L'utilisateur annule son like
      } else if (req.body.like === 0) {
          if (postObject.usersLiked.indexOf(req.body.userId) !== -1) { // Vérifie si user déjà dans le tableau des likes
              let i = postObject.usersLiked.indexOf(req.body.userId); // Si OUI Récupère l'index ou le userId est dans le tableau des likes
              postObject.usersLiked.splice(i, 1); // Retire le userID dans le tableau des likes 
              postObject.likes = postObject.likes-1; // Enlève le like dans le compteur
          }
      }

      // Récupération du post et mise à jour 
      Post.findOneAndUpdate({ _id: req.params.id}, { ...postObject, _id: req.params.id})
          .then(() => res.status(200).json({message : 'Post modifié!'}))
          .catch(error => res.status(400).json({ error }));
  })
  .catch( error => {
      res.status(500).json({ error });
  });
}


exports.getAllPost = (req, res, next) => {
    Post.find().sort({createdAt: -1}).then(
      (posts) => {
        res.status(200).json(posts);
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id})
      .then((post) => {
        User.findOne({_id: req.auth.userId})
        .then((user) => {
          if ((post.userId === req.auth.userId) || user.admin) {
            if(post.imageUrl !== undefined){
              // Supression si image
              const filename = post.imageUrl.split('/images/post/')[1];
              fs.unlink(`images/post/${filename}`, () => {
                  Post.deleteOne({ _id: req.params.id})
                  .then(() => res.status(200).json({message : 'Post supprimé !'}))
                  .catch(error => res.status(400).json({ error }));
              })
            } else {
              Post.deleteOne({ _id: req.params.id})
                  .then(() => res.status(200).json({message : 'Post supprimé !'}))
                  .catch(error => res.status(400).json({ error }));
            }
          } else {
            res.status(403).json({ message : 'Unauthorized request'});
          }
        });
    })
      .catch( error => {
          res.status(500).json({ error });
      });
 };