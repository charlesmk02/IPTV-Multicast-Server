/**
 * This function executes the dvblast command to start the stream.
 * The parameters specified by the client are :
 * the adapter ("-a"), the frequency ("-f") and the protocol ("-U" for UDP)
 */

const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.launchStream = async function (req) {
    try {
        if (req.body.proto === 'UDP') {
            console.log("In UDP")
            const { stdout, stderr } = await exec(`dvblast -a ${req.body.adpt} -f ${req.body.freq} -c /home/pi/config-channels${req.body.adpt} -m QAM_64 -b 8 -e -U`)
            return stderr
        } else {
            console.log("In RTP")
            const { stdout, stderr } = await exec(`dvblast -a ${req.body.adpt} -f ${req.body.freq} -c /home/pi/config-channels${req.body.adpt} -m QAM_64 -b 8 -e`)
            return stderr
        }
        
    } catch (err) {
        throw err
    }
}