const User = require('../models/User');
const jwt = require("jsonwebtoken");
exports.isAuthenticated = async function(req, res, next) {
    try {
        const {token} = req.cookies
        console.log(token)
        console.log(req.cookies.token)
        console.log(req.cookies)
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Bhai post create krne ke liye pehle login to karle"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}