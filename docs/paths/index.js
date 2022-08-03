const postFile = require("./postFile");

module.exports = {
    paths:{
        '/api/files':{
            ...postFile
        },
    }
}