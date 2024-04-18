const mongoose=require("mongoose")

const addBlogSchema=new mongoose.Schema({
    heading:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",  
    },
    like:{
        type:Number,
        required:false,
        default:0
    },
    disLike:{
        type:Number,
        required:false,
        default:0
    }
},{timestamps:true})




const AddBlog=mongoose.model("blog",addBlogSchema);
module.exports=AddBlog