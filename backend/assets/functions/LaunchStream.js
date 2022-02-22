const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.launchStream = async function (req) {
    try {
        var frequency = req.body.freq
        const { stdout, stderr } = await exec(`dvblast -a 0 -f ${frequency} -c /home/pi/config-channels -m QAM_64 -b 8 -e`)
        
        return stderr

    } catch (err) {
        throw err
    }
}