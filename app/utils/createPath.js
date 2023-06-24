const path = require('path');
const fs = require('fs');

function createPathDirectory() {
    let d = new Date();
    const year = d.getFullYear() + '';
    const month = d.getMonth() + '';
    const day = d.getDate() + '';
    const uploadPath = path.join(__dirname, "..", "..", "public", "upload", year, month, day);
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log(uploadPath);
    return path.join("public", "upload", year, month, day)
}


module.exports = {
    createPathDirectory
}