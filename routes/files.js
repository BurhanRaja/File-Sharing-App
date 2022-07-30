const router = require('express').Router()
const path = require('path')
const multer = require('multer')
const File = require('../models/File')
const { v4: uuid4 } = require('uuid')
const config = require("../config")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null, uniqueName)
    }
})

const upload = multer({
        storage: storage,
        limits: {fieldSize: 1000000 * 100}
    }).single('myfile')

router.post('/', (req, res) => {
    
    upload(req, res, async (err) => {
        if (!req.file) {
            return res.json({ error: "All fields required "})
        }

        if (err) {
            return res.status(500).send({error: err.message})
        }

        const fileUpload = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        })

        const response = await fileUpload.save()

        return res.send({filePath: `${config.base_URL}/files/${response.uuid}`})
    })
})

module.exports = router