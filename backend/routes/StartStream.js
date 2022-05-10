/**
 * On this route, the server writes the multicast addresses entered by the client
 * in a config file.
 * It also writes the channels streamed in a JSON file then it starts the stream.
 * The adapter, frequency, channels, multicast addresses and protocol
 * are specified in req.body.
 */

var express = require('express')
var router = express.Router();
const { setMulticastAddress } = require('../assets/functions/SetMulticastAddress')
const { launchStream } = require('../assets/functions/LaunchStream');
const { saveStream } = require('../assets/functions/SaveStream');
const { success } = require('../assets/functions/Respond');

router.post('/', async (req, res, next) => {
    try {
        setMulticastAddress(req)
        saveStream(req)
        let stderr = await launchStream(req)
        res.json(success(stderr))
    } catch (err) {
        next(err)
    }
});

module.exports = router;