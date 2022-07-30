const express = require('express')
const connectDb = require('./config/db')
const path = require('path')
// const cors = require('cors')

connectDb()

const app = express()
const port = 5000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// Template Engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

// routes
app.use('/api/files', require("./routes/files"))
app.use('/files', require("./routes/show"))

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})