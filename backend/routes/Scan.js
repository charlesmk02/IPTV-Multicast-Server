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