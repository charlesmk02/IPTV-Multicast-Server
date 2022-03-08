const { execSync } = require("child_process");
const { error } = require('./Respond')

exports.scanAll = function (res) {
        try {
            execSync('scan /usr/share/dvb/dvb-legacy/dvb-t/fr-Paris > /home/pi/channels.conf')
        } catch (err) {
            res.json(error(err.message))
        }
}