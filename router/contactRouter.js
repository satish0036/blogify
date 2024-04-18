const express = require("express");
const ContactModel = require("../models/contactModule");

const contactRouter = express.Router();

contactRouter.get("/addContact", (req, res) => {
    res.render("contact",{
        user: req.user
    })
})

contactRouter.post("/addContact", async (req, res) => {
    const { email, name, message } = req.body;
    try {
        await ContactModel.create({email, name, message })
        return res.render("contact",{
            message:"Message recived sucesfully"
        })
    }
    catch (err) {
        // console.log("erroe while adding contact", err)
        return res.render("contact",{
            error:"Error while reciving message"
        })
    }
})



module.exports = contactRouter