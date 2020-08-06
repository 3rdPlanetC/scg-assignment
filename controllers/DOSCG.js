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
    if (userMessage === 'X Y Z Finding value') {
        const {x, y, z} = XYZFinding()
        responseMessage = `X = ${x}, Y = ${y}, Z = ${z}`
    } else if (true) {
        const {b,c} = BCFinding(21)
        responseMessage = `B = ${b}, C = ${c}`
    }
    // switch(userMessage) {
    //     case 'X Y Z Finding value':
            
    //     case 'B C Finding value':
    //         // B C Finding Function
    //     case 'SCG Bangsue to Central World':
    //         // Google API Function
    //     default:
    //         responseMessage = userMessage
    // }
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
    const position = []
    const result = set.map((num, index) => {
        position.push(index)
        return (index+1)**2+(index+1)*(-3)+5
    })
    const x = result[0]
    const y =  result[1]
    const z = result[6]
    console.log("position: ", position)
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