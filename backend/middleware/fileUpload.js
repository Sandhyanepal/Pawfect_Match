const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        const fileDestination = './media'
        if(!fs.existsSync(fileDestination)){
            fs.mkdirSync(fileDestination,{recursive:true})
        }
        cb(null, fileDestination)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extname = path.extname(file.originalname)
        const basename =path.basename(file.originalname, extname)
        const filename = basename + '-' + uniqueSuffix + extname
        cb(null, filename)
    }
})

const fileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|jfif|JFIF|gif|GIF)$/)){
        return cb(new Error("Invalid file type"), false)
    }
    cb(null, true)
}


const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits:{
        fileSize: 2000000
    }
})

module.exports = upload