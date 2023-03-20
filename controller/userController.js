const usermodel = require('../Model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

module.exports.postSignUp = async (req,res,next)=>{

    try {
        const {username,email,password} = req.body
        const user = await usermodel.findOne({email})
        if(user){
            console.log(user);
            res.json({"status": "failed", "message": "Email already exist login now" })
        }else{
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password.trim(), salt)
            await usermodel.create({
                username,
                email,
                password:hashPassword
            })
            res.json({ "status": "success", "message": "signup success" })

        }
        
    } catch (error) {
        res.json({"status": "failed", "message":error.message})
        
    }

}

module.exports.postSignin = async (req,res,next)=>{
    const {email,password}=req.body
    const user = await usermodel.findOne({email:email})
    if(user){
        const isMatch = await bcrypt.compare(password,user.password)
        if(user.email ===email && isMatch){
            const userId= user._id
            const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,
                { expiresIn:300 })
               
            res.json({"auth":true,"token":token,"result":user, "status": "success", "message": "signin success" })

        }else{
            res.json({"auth":false, "status": "failed", "message": "User password is incorrect" })

        }
    }else{
        res.json({"auth":false, "status": "failed", "message": "No user please register" })

    }
}
module.exports.isUserAuth = async (req, res) => {
    try {
    let userDetails = await usermodel.findById(req.userId)
    userDetails.auth=true;

    res.json({
        "username":userDetails.username,
        "email":userDetails.email,
        "auth":true,
        "image":userDetails.image||null
    })
    } catch (error) {
        
    }
    

}
module.exports.userEdit =async (req, res)=>{
    try {
    const {...obj}= req.body
    const userId= req.userId;
    await usermodel.findByIdAndUpdate(userId,obj)
    const userDetails  =await usermodel.findOne({_id:userId}) 
    const result ={
        username:userDetails.username,
        email:userDetails.email,
        "auth":true,
        image:userDetails.image
    }
    res.json({result:result,status:'success'})  
    } catch (error) {
    res.json({status:"failed",message:error.message})
    }
   
}