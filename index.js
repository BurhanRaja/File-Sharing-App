const express = require('express')
const connectDb = require('./config/db')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

// Connect Database
connectDb()

const app = express()
const port = process.env.PORT || 5000

// Template Engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

// Use json
app.use(express.json())

// Cors
app.use(cors())

// routes
app.use('/api/files', require("./routes/files"))
app.use('/files', require("./routes/show"))
app.use('/file/download', require('./routes/download'))


// Docs
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");
const options = require('./docs')

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})