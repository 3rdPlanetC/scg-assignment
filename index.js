const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/webhook', (req, res) => res.sendStatus(200))

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})