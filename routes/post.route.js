var express = require('express');
var categoryModel = require('../models/category.model')
var postModel = require('../models/post.model');
var router = express.Router();


router.get('/', (req, res) => {
    var p = categoryModel.all();
    p.then(rows => {
        console.log(rows);
        res.render('post', {
            categories: rows
        });
    }).catch(err => {
        console.log(err);
        res.end('error occured')
    });
});

router.get('/:id', (req, res) => {
    var id = req.params.id;
    postModel.single(id).then(rows => {
        if(rows.length > 0) {
            res.render('post', {
                post: rows[0]
            })
        }
    }).catch(err => {
        console.log(err);
        res.end('error occured');
    }) 
});

module.exports = router;