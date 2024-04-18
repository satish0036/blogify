const mongoose=require("mongoose")

const commentSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true,
    
    },
    commentOnBlog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AddBlog",   
    },
    
    commentBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",   
    }
},{timestamps:true})




const CommentModel=mongoose.model("comment",commentSchema);
module.exports=CommentModel