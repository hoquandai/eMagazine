var express = require('express');
var categoryModel = require('../../models/category.model');
var postModel = require('../../models/post.model');
var router = express.Router();
var fs = require('fs');

router.get('/', (req, res, next) => {
    var p = categoryModel.getSubs();
    p.then(rows => {
        res.render('writer/post', {
            maincate: rows[0],
            subcate1: rows[1],
            subcate2: rows[2],
            subcate3: rows[3],
            subcate4: rows[4],
        });
    }).catch(next);
})

router.post('/', (req, res, next) => {
    var entity = {
        category: req.body.category,
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
        tag1: req.body.tag1,
        tag2: req.body.tag2,
        tag3: req.body.tag3,
        catename: req.body.catename,
        date: req.body.date,
        state: 4
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
        .catch(next);
})
module.exports = router;