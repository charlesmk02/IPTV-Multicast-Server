var express = require('express')
var router = express.Router();
const { scanAll } = require('../assets/functions/ScanAll')
const { convertIntoJSON } = require('../assets/functions/ConvertIntoJSON')
const { getUserChannels } = require('../assets/functions/GetUserChannels')

router.get('/', (req, res, next) => {
    scanAll(res)
    let obj = convertIntoJSON(res)
    getUserChannels(req, res, obj)
});

module.exports = router;
