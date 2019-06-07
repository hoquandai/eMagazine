var express = require('express');
var categoryModel = require('../../models/category.model');
var postModel = require('../../models/post.model');
var router = express.Router();


router.get('/', (req, res) => {
    var p = categoryModel.all();
    p.then(rows => {
        console.log(rows);
        res.render('writer/writer_post', {
            categories: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

router.post('/', (req, res) => {
    var entity = {
        category: req.body.category,
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
        tag1: req.body.tag1,
        tag2: req.body.tag2,
        tag3: req.body.tag3,
        catename: req.body.catename
    }

    postModel.add(entity)
        .then(postid => {
            console.log(postid);
            var cate = req.body.category;

            res.render(`writer/upload`,{
                cate: cate,
                postid: postid
            });
        })
        .catch(err => {
        console.log(err);
    })
})
module.exports = router;