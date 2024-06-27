const multer = require('multer')

const imageUpload = multer({ storage: multer.memoryStorage() })

module.exports = imageUpload