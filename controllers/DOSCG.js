const request = require('request')
const keys = require('../config')

const lineNotification = (req, res) => {
    let event = req.body.events[0]
    let replyToken = event.replyToken
    let userMessage = event.message.text
    console.log(userMessage)
    reply(replyToken, userMessage)
    res.sendStatus(200)
}

function reply(replyToken, userMessage) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keys.channelToken}`
    }
    let body = JSON.stringify({
        replyToken: replyToken,
        messages: [
            {
                type: 'text',
                text: userMessage
            }
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

module.exports = {
    lineNotification
}