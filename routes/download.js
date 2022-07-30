const router = require('express').Router()
const File = require('../models/File')

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid })

        if (!file) {
            return res.render('download', { error: "Link is expired" })
        }

        const filePath = `${__dirname}/../${file.path}`
        res.download(filePath)
    }

    catch (error) {
        res.status(500).send({ error: error.message })
    }
})

module.exports = router

