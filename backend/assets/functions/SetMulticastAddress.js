const { writeFileSync } = require('fs')

exports.setMulticastAddress = function (req) {
        try {
            var userChannels = req.body.chl
            console.log(userChannels)
            var string = ''
    
            for (key in userChannels) {
                string = string.concat(`\n${userChannels[key].ip} 1 ${userChannels[key].sid} #${key}`)
            }
            
            writeFileSync('/home/pi/config-channels', string)

        } catch (err) {
            throw err
        }
}