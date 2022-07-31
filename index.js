const express = require('express')
const connectDb = require('./config/db')
const path = require('path')
// const cors = require('cors')

connectDb()

const app = express()
const port = 5000


// Template Engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

// Use json
app.use(express.json())

// routes
app.use('/api/files', require("./routes/files"))
app.use('/files', require("./routes/show"))
app.use('/file/download', require('./routes/download'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})