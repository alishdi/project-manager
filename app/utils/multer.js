const multer = require('multer');

const path = require('path');
const { createPathDirectory } = require('./createPath');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, createPathDirectory())
    },
    filename: (req, file, cb) => {
        const type = path.extname(file.originalname || '')
       
        cb(null, Date.now() + type)
    }
})

const uploadMulter=multer({storage})



module.exports={
    uploadMulter
}