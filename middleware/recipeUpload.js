const multer = require('multer')
const path = require('path')
const fs = require('fs')

const MAX_FILE_SIZE = 1024 * 1024 * 10 // 10MB

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { user_id } = req.user

        if (!user_id) {
            return cb(new Error('Nincs bejelentkezve'), null)
        }

        const uploadDir = path.join(
            process.cwd(),
            'uploads',
            'recipes',
            String(user_id)
        )

        try {
            fs.mkdirSync(uploadDir, { recursive: true })
            cb(null, uploadDir)
        } catch (err) {
            cb(err, null)
        }
    },

    filename: (req, file, cb) => {
        const now = Date.now()
        const ext = path.extname(file.originalname)
        cb(null, `${now}${ext}`)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|gif|webp|svg/
        const extName = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        )
        const mimeType = fileTypes.test(file.mimetype)

        if (extName && mimeType) {
            cb(null, true)
        } else {
            cb(new Error('Csak képformátum engedélyezett'))
        }
    }
})

module.exports = { upload }