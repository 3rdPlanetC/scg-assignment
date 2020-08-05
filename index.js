const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer R165SfGGv+lbojqyosskCw2b+mVxpYzks/Du7sJ6f4a3iTBja1f6ij8redT97miBU+nGQVs6EEnPEOzHQC/3qJThrt7knf+cb9ABkB6xBk6EDc5lwdBijwCaKO5uSEM6MwCoVo3+eLMuHLXC4xce9wdB04t89/1O/w1cDnyilFU='
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}