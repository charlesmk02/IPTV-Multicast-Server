var express = require('express')
var router = express.Router();
const { execSync } = require('child_process');
const { success, error } = require('../assets/functions/Respond')

router.get('/', (req, res, next) => {
    (function () {
        try {
            execSync('killall dvblast')
            res.json(success('Stream terminated'))
        } catch (err){
            res.json(error(err.message))
        }
    })();
});

module.exports = router;