var express = require('express');
var router = express.Router();

router.get('/hello', function(req, res) {
    res.send('hello api');
});

router.use('/account', require('./account'));

module.exports = router;