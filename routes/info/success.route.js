var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('info/success', {
        layout: false
    })
});

module.exports = router;