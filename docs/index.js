const basicInfo = require("./basicInfo")
const server = require("./server")
const tags = require("./tags")
const paths = require('./paths')

const swaggerDefinition = {
    openapi: "3.0.3",
    ...basicInfo,
    ...server,
    ...tags,
    ...paths
}

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
}

module.exports = options