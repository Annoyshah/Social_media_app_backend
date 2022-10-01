const { reset } = require("nodemon");
const Post = require("../models/Post");
const User = require("../models/User");
const router = require("../routes/post");

exports.createPost = async (req , res) =>{
  try{

    const newPostData = {
        caption : req.body.caption,
        image : {
            public_id : "req.body.public_id" ,
            url : req.body.url,
        },
        owner : req.user._id,
    }
    const newPost = await Post.create(newPostData);
    const user = await User.findById(req.user._id);
    user.posts.push(newPost._id);//nayi post bnai uski id humne pass kar di hai humne
    await user.save();

    
    res.status(201).json({
        success : true,
        post : newPost
 
     })

  
  } catch (err){
    res.status(500).json({
       success : false,
       message : err.message,

    })
  }
}

exports.likeandUnlikePost = async function (req, res){
try{
  const post = await Post.findById(req.params.id);
  console.log(post)
  if (!post) {
    return res.status(404).json({
      success : false,
      message : "Post not found"
    })
  }
  console.log(req.user._id)
  console.log(req.params.id)
  console.log(post.likes.includes(req.user._id))
  console.log(post.likes._id)
  const index = post.likes.indexOf(req.user._id);
    console.log(`${index}`)
  if(post.likes.includes(req.user._id)){
    const index = post.likes.indexOf(req.user._id);
    console.log(`${index}`)// agar bhai  post ki array me already koi user exist krta hai to dubara touch krne pe usko splice krdo (pop) krdo
    post.likes.splice(index ,1 ) 
    //jo wala index hume diya gaya hai waha se delete kro 1 element
  
    
   await post.save();
   return res.status(200).json({
    success: true,
    message: "Post Unlike ho gayi brother"});
  
 }
 else {
  
  post.likes.push(req.user._id)
  await post.save();
  return res.status(200).json({ success: true, message: "Post liked"});
 }

}
catch(err)
{
  res.status(200).json({
    success: false,
    message: err.message,
  })
}
}

exports.deletePost = async function(req, res ){
  try{
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success : false,
        message : "Bhai kya baat krte ho ..Is id ki to merko koi bhi post nhi mili"
      })
    }
    if(post.owner.toString() !== req.user._id.toString()){
      return res.status(401).json({
        success : false,
        message : "Bhai yaar tum post ke owner nhi ho to tum post delete nhi kar skte"
      })
    }
    await post.remove();
    const user = User.findById(req.user._id);

    // const index = user.posts.indexOf(req.params.id);
    // console.log(index);
    // user.posts.splice(index , 1);
    await post.updateOne({$pull : {posts : req.body.userid}});
    await user.save();
    
    return res.status(200).json({
      success : true,
      message : "Bhai tumhari post delete ho chuki hai"
    })
  }
  catch(err){
    res.status(500).json({
      success : false,
      message : err.message
    })
  }
}
exports.getPostOfFollowing = async function(req, res){
  try{
    const user = await User.findById(req.user._id);
    
res.status({
  success : true,
   user,
})
  }catch(err){
    res.status(500).json({
      success : false,
      message : err.message
    })
  }
}