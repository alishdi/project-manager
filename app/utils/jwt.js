const jwt = require("jsonwebtoken");

function tokenGenerator(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '365 days' })
    return token
}
function tokenVerify(token) {
    const resul = jwt.verify(token, process.env.SECRET_KEY)
    if (!resul?.username) throw { status: 401, message: 'لطفا وارد حساب کاربری خود شوید' }
    return resul
}


module.exports = {
    tokenGenerator,
    tokenVerify
}