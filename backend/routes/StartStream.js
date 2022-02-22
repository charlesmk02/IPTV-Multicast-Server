var express = require('express')
var router = express.Router();
const { setMulticastAddress } = require('../assets/functions/SetMulticastAddress')
const { launchStream } = require('../assets/functions/LaunchStream');
const { success } = require('../assets/functions/Respond');

router.post('/', (req, res, next) => {
    setMulticastAddress(req)
        .then(() => launchStream(req))
        .then(stderr => res.json(success(stderr)))
        .catch(next)
});

module.exports = router;
