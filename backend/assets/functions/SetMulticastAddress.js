const { writeFileSync } = require('fs')
const { error } = require('./Respond')

exports.setMulticastAddress = function (req, res) {
    try {
        var userChannels = req.body.chl
        console.log(userChannels)
        var string = ''

        for (key in userChannels) {
            string = string.concat(`\n${userChannels[key].ip} 1 ${userChannels[key].sid} #${key}`)
        }
        
        writeFileSync('/home/pi/config-channels', string)

    } catch (err) {
        res.json(error(err.message))
    }
}