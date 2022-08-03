const router = require('express').Router()
const path = require('path')
const multer = require('multer')
const File = require('../models/File')
const { v4: uuid4 } = require('uuid')
const sendEmail = require('../services/emailService')
require('dotenv').config()


/**
 * @swagger
 * /api/files:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: string
 *             format: base64
 *             properties:
 *               name:
 *                 type: string
 *                 example: myfile
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filePath:
 *                   type: string
 *                   description: The user's name.
 *                   example: Leanne Graham
*/


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
    limits: { fieldSize: 1000000 * 100 }
}).single('myfile')

router.post('/', (req, res) => {

    upload(req, res, async (err) => {
        if (!req.file) {
            return res.json({ error: "All fields required." })
        }

        if (err) {
            return res.status(500).send({ error: err.message })
        }

        const fileUpload = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        })

        const response = await fileUpload.save()

        return res.send({ filePath: `${process.env.APP_BASE_URL}/files/${response.uuid}` })
    })
})

router.post('/send', async (req, res) => {
    const { uuid, emailFrom, emailTo } = req.body;

    if (!uuid || !emailFrom || !emailTo) {
        return res.status(422).send({ error: "All fields are required." })
    }

    const file = await File.findOne({ uuid: uuid })

    if (file.sender) {
        return res.status(422).send({ error: "Email Already sent." })
    }

    file.sender = emailFrom
    file.reciever = emailTo 
    const response = await file.save()

    // Send Email
    sendEmail({
        from: emailFrom,
        to: emailTo,
        subject: 'FileShare',
        text: `${emailFrom} has shared an email with you.`,
        html: require('../services/emailTemplate')( {
            text: `${emailFrom} has shared an email with you.`,
            downloadLink: `${process.env.APP_BASE_URL}/file/download/${file.uuid}`,
            size: file.size,
            expires: "24 hours"
        } )
    })

    return res.send({ success: true })

})

module.exports = router