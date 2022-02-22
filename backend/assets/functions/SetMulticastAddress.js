const { writeFileSync } = require('fs')

exports.setMulticastAddress = function (req, res) {
    return new Promise((resolve, reject) => {
        try {
            var userChannels = req.body.chl
            console.log(userChannels)
            var string = ''
    
            for (key in userChannels) {
                string = string.concat(`\n${userChannels[key].ip} 1 ${userChannels[key].sid} #${key}`)
            }
            
            writeFileSync('/home/pi/config-channels', string)

            resolve()
    
        } catch (err) {
            reject(err)
        }
    })
}