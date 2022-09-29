
const express = require('express');
const router = require('express').Router();
const {createPost, likeandUnlikePost, deletePost} = require("../controllers/post");
const { isAuthenticated } = require('../middlewares/auth');
// const router = require('express').Router
module.imports = isAuthenticated
module.imports= likeandUnlikePost
module.imports = deletePost

router.route("/post/upload").post(isAuthenticated,createPost );
router.route("/post/:id").put(isAuthenticated,likeandUnlikePost).delete(isAuthenticated , deletePost);
module.exports = router;