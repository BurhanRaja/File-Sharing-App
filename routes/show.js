const router = require('express').Router()
const File = require('../models/File')
require('dotenv').config()

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid })
        
        if (!file){
            return res.render('download', { error : "Link is expired" })
        }
        
        return res.render('download', {
            uuid: file.uuid,
            filename: file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/file/download/${file.uuid}`
        })
    }
    catch (error) {
        return res.render('download', { error : "Something went wrong." })
    }
})

module.exports = router