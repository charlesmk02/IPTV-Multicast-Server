var express = require('express')
var router = express.Router();
const { setMulticastAddress } = require('../assets/functions/SetMulticastAddress')
const { launchStream } = require('../assets/functions/LaunchStream')

router.post('/', (req, res, next) => {
    setMulticastAddress(req, res)
    launchStream(req, res)
});

module.exports = router;