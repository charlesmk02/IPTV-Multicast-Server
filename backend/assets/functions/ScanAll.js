const { execSync } = require("child_process");

exports.scanAll = function () {
    try {
        execSync('scan /usr/share/dvb/dvb-legacy/dvb-t/fr-Paris > /home/pi/channels.conf')        
    } catch (err) {
        throw err
    }
}