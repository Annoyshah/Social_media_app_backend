const express = require('express'); 
const app = express();
if(process.env.NODE_ENV !== 'production') {
    require("dotenv").config({path : "backend/config/config.env"})
  }
  //using middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended : true}));

const post = require("./routes/post.js");
// const user = require("./routes/user.js");
const user = require("./routes/user.js")



app.use("/api/v1",post);
app.use("/api/v1",user)
module.exports = app;