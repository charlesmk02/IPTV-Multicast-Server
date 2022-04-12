var express = require('express');
var router = express.Router();
const { success } = require('../assets/functions/Respond');
const { readFileSync } = require('fs')


router.post('/', (req, res, next) => {
    try {
        if (readFileSync(`/home/pi/stream${req.body.adpt}.json`).length != 0) {
            res.json(success(JSON.parse(readFileSync(`/home/pi/stream${req.body.adpt}.json`))))
        } else {
            res.json(success(false))
        }
    } catch (err) {
        next(err)
    }
});

module.exports = router;