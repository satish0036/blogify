const mongoose=require("mongoose")
const {createHmac,randomBytes}=require("crypto")


const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
        
    },
    password:{
        type:String,
        required:true
    },
    profileURL:{
        type:String,
        default:"Image"
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
        
    }
},{timestamps:true})

//before creating a user or update a user
userSchema.pre('save', function(next) {
     // do stuff
    const user=this;
    // if(user.isModified(this.password)){
    //     return next()
    // }
    const salt=randomBytes(16).toString()
    const hashPassword=createHmac("sha256",salt).update(user.password).digest("hex")
    this.salt=salt;
    this.password=hashPassword
    next();
  });

//at login time

userSchema.static("matchPassword",async function(email,password){
   
    const user =await this.findOne({email})
    if(!user) throw new Error("User Not found")
    const salt=user.salt;
    const hashPassword=user.password;
    const userProvidedPassword=createHmac("sha256",salt).update(password).digest("hex")
    if(hashPassword!==userProvidedPassword) throw new Error("Wrong Crediantial")
    return user
})


const User=mongoose.model("user",userSchema);
module.exports=User