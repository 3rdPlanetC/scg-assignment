const request = require('request')
const keys = require('../config')

// controller
const lineNotification = (req, res) => {
    const event = req.body.events[0]
    const replyToken = event.replyToken
    const userMessage = event.message.text
    reply(replyToken, userMessage)
    res.sendStatus(200)
}

const reply = (replyToken, userMessage) => {
    let responseMessage = null
    console.log(userMessage)
    console.log(userMessage === 'X Y Z Finding value')
    switch(userMessage) {
        case 'X Y Z Finding value':
            const {x, y, z} = XYZFinding()
            responseMessage = `X = ${x}, Y = ${y}, Z = ${z}`
        case 'B C Finding value':
            // B C Finding Function
        case 'SCG Bangsue to Central World':
            // Google API Function
        default:
            responseMessage = userMessage
    }
    const body = JSON.stringify({
        replyToken: replyToken,
        messages: [
            {
                type: 'text',
                text: responseMessage
            }
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keys.channelToken}`
        },
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

const XYZFinding = () => {
    const set = [null, null, 5, 9, 15, 23, null]
    const result = set.map((num, index) => {
        return (index+1)**2+(index+1)*(-3)+5
    })
    const x = result[0]
    const y =  result[1]
    const z = result[6]
    return {
        x,y,z
    }
}

module.exports = {
    lineNotification
}