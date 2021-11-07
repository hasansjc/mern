const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema= new mongoose.Schema({
    name:{
        type: String,
        required : false
    },
    email:{
        type: String,
        required : false
    },
    phone:{
        type: Number,
        required : false
    },
    work:{
        type: String,
        required : false
    },
    password:{
        type:String,
        required :false
    },
    cpassword:{
        type:String,
        required : false
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
            message:{
            type:String
            }
        }  
    ],
    
    tokens:[
        { token:{
            type:String,
            required : false
            }
        }
    ]
})

studentSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,8);          //hashing the password for security
        this.cpassword=undefined;                                   //removing confirm password field
    }
    next();    //  from here returns back to the registration code
})

// gernrating token while user login
studentSchema.methods.generateAuthToken = async function () {
    try{ 
       let token = await jwt.sign({_id:this._id},process.env.SECRET_KEY)
       this.tokens=this.tokens.concat({token:token})
       await this.save();
       return token;
    }
    catch(err){
        console.log(err)
    }
    
}
studentSchema.methods.addMessage = async function (message) {
    try{
        this.messages=this.messages.concat({message})
        await this.save();
        return this.messages;
    }catch(err){
        console.log(err);
    }
}

const Student=mongoose.model('STUDENT',studentSchema);
module.exports=Student;