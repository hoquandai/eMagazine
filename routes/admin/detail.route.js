var express = require('express');
var categoryModel = require('../../models/category.model')
var router = express.Router();


router.get('/', (req, res, next) => {
    var p = categoryModel.all();
    p.then(rows => {
        console.log(rows);
        res.render('admin/details', {
            categories: rows,
            layout: false
        });
    }).catch(next);
})

module.exports = router;