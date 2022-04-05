var express = require('express');
var router = express.Router();

/* The React app is hosted on the index page. */
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = router;
