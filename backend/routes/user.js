const express = require('express');
const router = require('express').Router();
const {register , login} = require("../controllers/user");
const { isAuthenticated } = require('../middlewares/auth');
const {followUser} = require('../controllers/user');
router.route("/register").post(register);
router.route("/login").post(login);
module.exports = router;
module.imports = isAuthenticated
module.imports = followUser
router.route("/follow/:id").get(isAuthenticated, followUser);