const dotenv = require('dotenv')
const express=require("express")
const mongoose=require("mongoose")
const userRouter=require("./router/userRouter.js")
const path=require("path")
const {checkForAuthCookies} = require("./middlewares/authMiddlewares.js")

var cookieParser = require('cookie-parser')
const addBlogRouter = require("./router/addBlogRouter.js")
const commentRouter = require("./router/commentRouter.js")
const contactRouter = require("./router/contactRouter.js")
dotenv.config();
const PORT=process.env.PORT 
const app=express()

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

//middlewares

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

mongoose.connect(process.env.DB_DATABASE)
.then(()=>console.log("MogoDb is connected"))
.catch((err)=>console.log("MongoDb not connected",err))


app.use(checkForAuthCookies())

app.get("/",(req,res)=>{
    return res.render("home",{
        user:req?.user
    })
})

app.use("/auth",userRouter)
app.use("/blog",addBlogRouter)
app.use("/comment",commentRouter)
app.use("/contact",contactRouter)

app.listen(PORT,()=>{
    console.log("Server is Connected")
})