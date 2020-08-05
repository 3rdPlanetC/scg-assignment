const request = require('request')
const keys = require('../config')

const lineNotification = (req, res) => {
    let event = req.body.events[0]
    let replyToken = event.replyToken
    console.log(event)
    reply(replyToken)
    res.sendStatus(200)
}

function reply(replyToken) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keys.channelToken}`
    }
    let body = JSON.stringify({
        replyToken: replyToken,
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

module.exports = {
    lineNotification
}