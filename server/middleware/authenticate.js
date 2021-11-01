const jwt= require("jsonwebtoken");
const Student = require("../model/studentSchema")
const authenticate= async (req,res,next)=>{
    try{
        const token = req.cookies.jwttoken;
        console.log(token);
        const verifyUser = jwt.verify(token,"mynameisahmedhasanandthisismysecretkeyofthisproject")
        console.log(verifyUser);
        const rootuser=await Student.findOne({_id:verifyUser._id, "tokens.token":token})
        console.log(rootuser);
        if(!rootuser){
            throw new Error('User not found')
        }
        req.rootuser=rootuser;
        req.token=token;
        req.UserID=rootuser._id;
        next();
    }
    catch(err){
        res.status(400).send("you must login first");
    }
}
module.exports = authenticate;