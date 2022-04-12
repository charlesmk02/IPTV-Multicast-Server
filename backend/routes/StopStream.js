/**
 * On this route, the server terminates all dvblast processes.
 */

var express = require('express')
var router = express.Router();
const { execSync } = require('child_process');
const { success } = require('../assets/functions/Respond')
const { writeFileSync } = require('fs')

router.get('/', (req, res, next) => {
    (function () {
        try {
            writeFileSync('/home/pi/stream0.json', '')
            writeFileSync('/home/pi/stream1.json', '')
            execSync('killall dvblast')
            
            res.json(success('Stream terminated'))
        } catch (err){
            next(err)
        }
    })();
});

module.exports = router;