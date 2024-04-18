const express = require("express")
const CommentModel = require("../models/commentModel")

const commentRouter = express.Router()



commentRouter.post("/addComment/:id", async (req, res) => {
  
    const { comment } = req.body;
    const fullName=req.user.fullName
    const commentOnBlog = req.params.id
    const commentBy = req.user._id

    try {
        await CommentModel.create({
            fullName,
            comment,
            commentOnBlog,
            commentBy
        })
        res.redirect(`/blog/singleBlog/${commentOnBlog}`)
    }
    catch (err) {
        return res.send("you got a error")
    }
})







module.exports = commentRouter
