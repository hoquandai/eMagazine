var express = require('express');
var categoryModel = require('../../models/category.model')
var router = express.Router();


router.get('/', (req, res) => {
    var p = categoryModel.all();
    p.then(rows => {
        console.log(rows);
        res.render('reader/top', {
            categories: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

module.exports = router;