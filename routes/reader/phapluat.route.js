var express = require('express');
var categoryModel = require('../../models/category.model')
var router = express.Router();


router.get('/', (req, res, next) => {
    var p = categoryModel.all();
    p.then(rows => {
        console.log(rows);
        res.render('reader/phapluat', {
            categories: rows,
            active: true,
        });
    }).catch(next);
})

module.exports = router;