/**
 * This function scans all the DVB-T multiplexes available in Paris, France
 * and writes the generated channel list in a config file.
 * The adapter (tuner) is specififed with the -a parameter.
 */

const { execSync } = require("child_process");

exports.scanAll = function (req) {
    try {
        /**
         * We must proceed synchronously as the config file must be complete
         * before we read it in ConvertIntoJSON.js.
         */
        execSync(`scan /usr/share/dvb/dvb-legacy/dvb-t/fr-Paris -a ${req.body.adpt} > /home/pi/channels.conf`)        
    } catch (err) {
        throw err
    }
}