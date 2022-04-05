/**
 * On this route the server scans all the channels with the tuner selected
 * and returns the channels that are in the frequency entered by the client.
 * The adapter and the frequency are specified in the req.body.
 */

var express = require('express')
var router = express.Router();
const { scanAll } = require('../assets/functions/ScanAll')
const { convertIntoJSON } = require('../assets/functions/ConvertIntoJSON')
const { getUserChannels } = require('../assets/functions/GetUserChannels')
const { success } = require('../assets/functions/Respond')

router.post('/', (req, res, next) => {
    try {
        scanAll(req)
        let obj = convertIntoJSON()
        let data = getUserChannels(req, obj)
        res.json(success(data))
    } catch (err) {
        next(err)
    }
});

module.exports = router;