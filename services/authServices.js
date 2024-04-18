const jwt=require("jsonwebtoken")
const secretKey="ILOVEU"
function generateHash(user){

    const hash=jwt.sign({
        fullName:user.fullName,
        email:user.email,
        profileURL:user.profileURL,
        role:user.role,
        _id:user._id
    },secretKey)
    return hash

}
function getUserFromHash(token){

    const user=jwt.verify(token,secretKey)
    // console.log(user)
    return user
}


module.exports={generateHash,getUserFromHash}