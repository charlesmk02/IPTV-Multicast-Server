/**
 * This function writes the multicast addresses set by the user
 * in a config file used by the dvblast command. 
 */

const { writeFileSync } = require('fs')

exports.setMulticastAddress = function (req) {
        try {
            // We retrieve the object that includes the parameters set for every channel
            var userChannels = req.body.chl
            // This string includes all of the text to be written
            var string = ''
            /**
             * Each line of the file corresponds to a channel :
             * "IP:PORT 1 SID #NAME"
             */
            for (key in userChannels) {
                string = string.concat(`\n${userChannels[key].ip} 1 ${userChannels[key].sid} #${key}`)
            }
            /**
             * We must proceed synchronously as the config file must be complete
             * before dvblast reads it.
             * The name of the file depends on the adapter (tuner) selected by the client.
             */
            writeFileSync(`/home/pi/config-channels${req.body.adpt}`, string)

        } catch (err) {
            throw err
        }
}