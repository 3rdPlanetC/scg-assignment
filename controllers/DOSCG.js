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
    let responseMessage = "I can't understand. What did you say?"
    if (userMessage === 'X Y Z Finding value') {
        const {x, y, z} = XYZFinding()
        responseMessage = `X = ${x}, Y = ${y}, Z = ${z}`
    } else if (userMessage === 'B and C Finding value') {
        const {b,c} = BCFinding(21)
        responseMessage = `B = ${b}, C = ${c}`
    } else if (userMessage === 'SCG Bangsue to Central World') {
        responseMessage = "https://whispering-savannah-62098.herokuapp.com"
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

// function
const XYZFinding = () => {
    const set = [null, null, 5, 9, 15, 23, null]
    const pos = []
    const result = set.map((num, index) => {
        if (num === null) {
            pos.push(index)
        }
        return (index+1)**2+(index+1)*(-3)+5
    })
    const x = result[pos[0]]
    const y =  result[pos[1]]
    const z = result[pos[2]]
    return {
        x,y,z
    }
}

const BCFinding = (a) => {
    const b = 23-a
    const c = -21-a
    return {
        b,c
    }
}

module.exports = {
    lineNotification
}