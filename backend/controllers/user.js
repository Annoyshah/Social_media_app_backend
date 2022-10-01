

var User = require("../models/User.js");

exports.register = async (req,res) => {
    try{
        const {name ,email , password} = req.body;
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
            success : false ,
            message :"User already exists"
        })}
        user = await User.create({
             name,
             email , 
             password ,
             avatar : {public_id : 'sample_id' , url :"sampleurl"}
    })
  res.status(201).json({success : true ,user})    

    }catch(error){
        res.status(400).json({
            success : false,
            message : error.message,

        })
    }
}
exports.login = async (req , res) => {

try {
    const {email , password} = req.body;
    const user = await User.findOne({email}).select("+password");
    if (!user){
        return res.status(404).json({
            success : false , message : "User does not exist"
    });
}
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json ({
       success : false,
       message : "Incorrect Password" 
    })
  }
  const token = await user.generateToken()
  res.status(200).cookie("token", token , {expires: new Date(Date.now() + 90*24*60*60*1000),
    httpOnly: true
}).json({
     success : true,
     user , 
     token ,
  });
} catch (error) {
 res.status(500).json({
    success : false,
    message : error.message,
 })
}
}
exports.followUser = async (req , res) => {
  try{
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if (!userToFollow){
      return res.status(404).json({
        success : false,
        message : "User nhi mil rha bhai"
      })
    }
  
    if (loggedInUser.following.includes(userToFollow._id)){
     
    
    const indexfollowing= loggedInUser.following.indexOf(userToFollow._id);
   loggedInUser.following.splice(indexfollowing,1)

   const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);
    userToFollow.followers.splice(indexfollowers,1);

    await loggedInUser.save();
    await userToFollow.save();
    res.status(200).json({
      status : true,
      message : "Unfollowed"

    })
  }
    else{
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);
      await loggedInUser.save();
      await userToFollow.save();
      res.status(200).json({
        success: true ,
        message : "Followed user successfully"
  
      })
    }

  }catch (error) {
    res.status(500).json({
      success : false,
      message : error.message,
    })
  }
}