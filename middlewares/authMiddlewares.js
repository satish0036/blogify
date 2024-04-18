const { getUserFromHash } = require("../services/authServices")


function checkForAuthCookies(){
 return (req,res,next)=>{

    const token=req.cookies?.token
    // console.log("token",token)
    if(!token){
        return next()
    }
    const user=getUserFromHash(token)
    req.user=user
   next()
}
}

function checkForSignIn(req,res,next){
    
    const token=req.cookies?.token
    if(!token){
        return res.render("signin")
    }
    next()

}

module.exports={checkForAuthCookies,checkForSignIn}