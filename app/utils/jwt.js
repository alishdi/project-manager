const jwt = require("jsonwebtoken");

function tokenGenerator(payload) {
    const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'365 days'})
    return token
}

module.exports={
    tokenGenerator
}