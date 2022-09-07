
const express = require('express');
const router = require('express').Router();
const {createPost} = require("../controllers/post")
// const router = require('express').Router


router.route("/post/upload").post(createPost);
module.exports = router;