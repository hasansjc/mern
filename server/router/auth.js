const express = require('express');
const cookieParser=require('cookie-parser')
const router = express.Router();
router.use(cookieParser());
const bcrypt = require('bcryptjs')
const authenticate=require('../middleware/authenticate')
const jwt = require("jsonwebtoken");
require('../db/conn');
const Student = require("../model/studentSchema")
router.get('/', (req, res) => {
    res.send('hello from the router server js');
});
router.post('/register', async(req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        res.status(422).json({ error: "plz enter valid data" });
        return (res.status(422))
    }
    try {
        const userexist = await Student.findOne({ email: email })

        if (userexist) {
             res.status(422).json({ error: "Email already exist" });
             return res.status(422);
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "Password are not matching" });
        }
        else {
            const userregister = new Student(req.body);
            // running a middleware here for hashing the passwords
            await userregister.save()
            return res.status(201).json({ message: "user registered successfully" });
        }
    }
    catch (err) {
        res.status(422).json({ error: "failed to register" });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "Please fill all the fields" })
        }

        const userlogin = await Student.findOne({ email })
       // console.log(userlogin);
        if (userlogin) {
            console.log("inside if");
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(isMatch);

            console.log("This is from app.js");

            console.log(isMatch);
            if (!isMatch) {
                res.status(422).json({ msg: "invalid credentials" })
            }
            else {
                
                console.log(userlogin);
                const token = await userlogin.generateAuthToken();
                console.log(token);

                res.cookie("jwttoken",token,{
                    //expires :new Date(Date.now()+300000) ,
                    httpOnly :true
                })
                res.status(201).json({ msg: "user login successfully" })

            }
        }
        else {
            res.status(422).send({ error: "No email found" })
        }
    } catch (err) {
        res.status(422).send(err)
    }
})

router.get('/about',authenticate,(req,res)=>{
    console.log("hello from about");
    res.status(200).send(req.rootuser);

})
router.get('/getdata',authenticate,(req,res)=>{
    console.log("hello from about");
    res.status(200).send(req.rootuser);

})
router.get('/logout',(req,res)=>{
    res.clearCookie('jwttoken',{path:'/'});
    res.status(200).send("user logout successfully")
})
router.post('/contact',authenticate, async (req,res)=>{
    console.log("hello from contact router page")
    console.log(req.body.message)
    console.log(req.UserID)
    
    try{
            if(!req.body.message){
                return res.status(400).send("Please fill the contact form")
            }
            const usercontact = await Student.findOne({_id:req.UserID})

            if(!usercontact){
                return res.status(201).send("user not logged in")
            }
                const usermessage= await usercontact.addMessage(req.body.message)
                await usercontact.save();
                console.log("message sent succss");
                return res.status(201).json({msg:"message sent successfully"})
            
    }catch(err){
            console.log(err);
    }
})
module.exports = router;

