const mongoose = require('mongoose');
exports.connectDatabase =  ()=>{
    mongoose.connect("mongodb://localhost:27017/Socialmedia")
    .then((con) => {console.log(`Database Connected : ${con.connection.host}`)})
    .catch((err)=>{console.log(`${err}`)})
 
}