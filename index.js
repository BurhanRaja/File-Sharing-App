const express = require('express')
const connectDb = require('./config/db')
// const cors = require('cors')
connectDb()

const app = express()
const port = 5000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.use('/api/files', require("./routes/files"))
app.use('/files', require("./routes/show"))

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})