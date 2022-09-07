// const post = require('./Post');
// const moongoose = require
// exports.createPost = async (req,res)=>{
// try {
//     const post = await Post.create(req , body);
//     res.status(201).json({
//         success : true ,
//         data : post
//     })

// } catch (error){
//    res.status(500).json({
//     success : false,
//     message : error.message

//    })
// }
// };
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({

    caption : String,

    image:{
        public_id:String,
        url:String
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"

    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    likes : [
        {
           user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"  

            },
        }
        

    ],

    comments : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"  

            },
            comment : {
               type: String,
               required : true
            },
        },

    ]

});
module.exports = mongoose.model("Post",postSchema);