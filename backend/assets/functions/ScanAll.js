const { execSync } = require("child_process");

exports.scanAll = function (req) {
    try {
        execSync(`scan /usr/share/dvb/dvb-legacy/dvb-t/fr-Paris -a ${req.body.adpt} > /home/pi/channels.conf`)        
    } catch (err) {
        throw err
    }
}