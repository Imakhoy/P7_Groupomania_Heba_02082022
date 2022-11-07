//REQUIRE
const Post = require("../models/post.models");

/*const User = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

//GET
module.exports.readPost = (req, res) => {
  PostModel.find((err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log("Error to get data : " + err);
    }
  });
};

//CREATE
module.exports.createPost = async (req, res) => {
  let filename;

  if (req.file != null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      ) {
        console.log(req.file);
        throw Error("invalid file");
      }
      if (req.file.size > 500000) {
        throw Error("max size");
      }
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    filename = req.body.postId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(`../frontend/public/img/posts/${filename}`)
    );
  }

  const newPost = new PostModel({
    postId: req.body.postId,
    message: req.body.message,
    picture: req.file != null ? "img/posts/" + filename : "",
    video: req.body.video,
    likers: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

//PUT
module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Id inconnu : " + req.params.id);
  }

  const updatedMessage = {
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedMessage },
    { new: true },
    (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log("Erreur de modification : " + err);
      }
    }
  );
};

//DELETE
module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Id inconnu : " + req.params.id);
  }

  PostModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log("Erreur de suppression" + err);
    }
  });
};

//LIKE DU POST
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Id inconnu : " + req.params.id);
  }

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true }
    ).catch((err) => res.status(400).send(err));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    )
      .then((data) => {
        return res.send(data);
      })
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(400).send(err);
  }
};

//UNLIKE DU POST
module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Id inconnu : " + req.params.id);
  }
  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }
    ).catch((err) => res.status(400).send(err));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    )
      .then((data) => {
        return res.send(data);
      })
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(400).send(err);
  }
};
*/