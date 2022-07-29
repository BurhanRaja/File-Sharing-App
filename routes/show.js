const router = require('express').Router()
const File = require('../models/File')

router.get('/:uuid', async (req, res) => {
    // try {
    //     const file = File.findOne({ uuid: req.params.uuid })
        
    //     res.download(`uploads/${file.filename}`, (err) => {
    //         res.status(500).send({error: err.message})
    //     })
    // }
    // catch (error) {
    //     res.status(500).send({message: error.message})
    // }
})