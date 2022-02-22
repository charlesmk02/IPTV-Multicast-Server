var express = require('express')
var router = express.Router();
const { scanAll } = require('../assets/functions/ScanAll')
const { convertIntoJSON } = require('../assets/functions/ConvertIntoJSON')
const { getUserChannels } = require('../assets/functions/GetUserChannels')
const { success } = require('../assets/functions/Respond')

router.post('/', (req, res, next) => {
    scanAll()
        .then(() => convertIntoJSON())
        .then(obj => getUserChannels(obj, req))
        .then(data => res.json(success(data)))
        .catch(next)
});

module.exports = router;
