var express = require('express');
var router = express.Router();

router.get('/hello', function (req, res) {
    req.models['account'].find().exec(console.log);
    res.render('hello');
});

module.exports = router;