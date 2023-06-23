const bcrypt = require('bcrypt');

function hashPassword(str) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt)

}

module.exports={
    hashPassword
}