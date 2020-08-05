const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes
const webhook = require('./routes/webhook')

app.use('/', webhook)

// app.post('/webhook', (req, res) => {
    // let replyToken = req.body.events[0].replyToken
    // reply(replyToken)
//     res.sendStatus(200)
// })

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

//
// function reply(replyToken) {
//     let headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${keys.channelToken}`
//     }
//     let body = JSON.stringify({
//         replyToken: replyToken,
//         messages: [{
//             type: 'text',
//             text: 'Hello'
//         },

//         {
//             type: 'text',
//             text: 'How are you?'
//         }]
//     })
//     request.post({
//         url: 'https://api.line.me/v2/bot/message/reply',
//         headers: headers,
//         body: body
//     }, (err, res, body) => {
//         console.log('status = ' + res.statusCode);
//     });
// }