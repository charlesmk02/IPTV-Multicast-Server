var express = require('express')
var router = express.Router();
const { setMulticastAddress } = require('../assets/functions/SetMulticastAddress')
const { launchStream } = require('../assets/functions/LaunchStream');
const { success } = require('../assets/functions/Respond');

router.post('/', async (req, res, next) => {
    try {
        setMulticastAddress(req)
        let stderr = await launchStream(req)
        res.json(success(stderr)) 
    } catch (err) {
        next(err)
    }
});

module.exports = router;