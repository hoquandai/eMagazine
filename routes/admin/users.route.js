var express = require('express');
var categoryModel = require('../../models/category.model')
var router = express.Router();


router.get('/', (req, res, next) => {
    var p = categoryModel.all();
    p.then(rows => {
        console.log(rows);
        res.render('admin/user_management', {
            categories: rows
        });
    }).catch(next);
})

module.exports = router;