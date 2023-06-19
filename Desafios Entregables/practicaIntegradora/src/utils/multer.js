const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `../practicaIntegradora/src/public/assets/img`)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const uploader = multer({ storage })

module.exports = {
    uploader
}