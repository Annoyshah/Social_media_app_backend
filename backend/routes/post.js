
const express = require('express');
const router = require('express').Router();
const {createPost, likeandUnlikePost, deletePost, getPostOfFollowing} = require("../controllers/post");
const { isAuthenticated } = require('../middlewares/auth');
// const router = require('express').Router
module.imports = isAuthenticated
module.imports= likeandUnlikePost
module.imports = deletePost
module.imports = getPostOfFollowing

router.route("/post/upload").post(isAuthenticated,createPost );
router.route("/post/:id").put(isAuthenticated,likeandUnlikePost).delete(isAuthenticated , deletePost);
router.route("/posts").get(isAuthenticated , getPostOfFollowing);
module.exports = router;
