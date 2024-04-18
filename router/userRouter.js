const express=require("express")
const User  =require("../models/userModel.js")
const { generateHash } = require("../services/authServices.js")
const userRouter= express.Router()

userRouter.get("/signin",(req,res)=>{
    return res.render("signin")
})
userRouter.get("/signup",(req,res)=>{
    return res.render("signup")
})
userRouter.get("/logout",(req,res)=>{
    return res.clearCookie("token").redirect("/")
})

userRouter.post("/signin",async(req,res)=>{
    const {email,password}=req.body;

    try{
      
        const user=await User.matchPassword(email,password)
        const hash=generateHash(user)
       
            res.cookie("token",hash).redirect("/")
    }
    catch(err){
        // console.log("err in singIn",err)
        return res.render("signin",{
            error:"Incorrect Email or Password"
        })

    }

})

userRouter.post("/signup",async(req,res)=>{
 const {fullName,email,password}=req.body;

 try{
     await User.create({fullName,email,password})
     console.log("user created Succes")
    return res.redirect("signin")
 }
 catch(err){
    // console.log("error creating user")
    return res.send("error creating user");
 }

})




module.exports=userRouter