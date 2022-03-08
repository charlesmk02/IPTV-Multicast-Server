const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { success, error } = require('./Respond')

exports.launchStream = async function (req, res) {
    try {
        var frequency = req.body.freq
        const { stdout, stderr } = await exec(`dvblast -a 0 -f ${frequency} -c /home/pi/config-channels -m QAM_64 -b 8 -e`)
        
        res.json(success(stderr))

    } catch (err) {
        res.json(error(err.message))
    }
}