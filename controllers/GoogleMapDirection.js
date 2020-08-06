var path = require('path')

const googleMap = (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
}

module.exports = {
    googleMap
}