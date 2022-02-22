const { execSync } = require("child_process");

exports.scanAll = function () {
    return new Promise((resolve, reject) => {
        try {
            execSync('scan /usr/share/dvb/dvb-legacy/dvb-t/fr-Paris > /home/pi/channels.conf')
            resolve()
        } catch (err) {
            reject(err)
        }
    })
        
}