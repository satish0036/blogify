const express = require("express");
const AddBlog = require("../models/addPostModel");
const CommentModel = require("../models/commentModel");
const {checkForSignIn} = require("../middlewares/authMiddlewares");


const addBlogRouter = express.Router();



addBlogRouter.get("/addblog", checkForSignIn, (req, res) => {
    res.render("addBlog", {
        user: req.user
    })
})

addBlogRouter.get("/singleBlog/:id",checkForSignIn, async (req, res) => {
    const _id = req.params.id
    // console.log("from single blog", req.params.id)
    try {

        const singleBlog = await AddBlog.findById(_id)
        const commentOnBlog=await CommentModel.find({commentOnBlog:_id})
        // console.log("comment on blog",commentOnBlog)
        res.render("singleBlog", {
            user: req.user,
            singleBlog: singleBlog,
            commentOnBlog:commentOnBlog
        })
    }
    catch (err) {
        // console.groupCollapsed(err)
        res.end("error while featching")
    }

})

addBlogRouter.get("/allblog", async (req, res) => {
    try {
        const allBlog = await AddBlog.find({})
        res.render("allBlog", {
            user: req.user,
            allBlog: allBlog
        })
    }
    catch (err) {
        res.render("allBlog", {
            user: req.user,
            "message": "No blog is there"
        })
    }



})

addBlogRouter.post("/addblog", async (req, res) => {
    const { heading, content } = req.body;
    try {
        const blog = await AddBlog.create({ heading, content, createdBy: req.user._id })
        // console.log("blog", blog)
        res.redirect(`/blog/singleBlog/${blog._id}`)
    }
    catch (err) {
        // console.log(err)
        res.send("error while posting")
    }




})

module.exports = addBlogRouter