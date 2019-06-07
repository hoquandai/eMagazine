var express = require('express');
var categoryModel = require('../../models/category.model');
var postModel = require('../../models/post.model');
var router = express.Router();


router.get('/', (req, res) => {
    var p = postModel.all();
    p.then(rows => {
        console.log(rows);
        res.render('writer/upload', {
            posts: rows
        });
    }).catch(err => {
        console.log(err);
    });
});

router.get('/:cate/:id', (req, res) => {
    var id = req.params.id;
    var cate = req.params.cate;
    console.log(cate + id);
    res.render('writer/upload', {
        cate: cate,
        postid: id
    });
});
module.exports = router;