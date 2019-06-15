var express = require('express');
var categoryModel = require('../models/category.model')
var postModel = require('../models/post.model');
var router = express.Router();


router.get('/', (req, res, next) => {
    var p = categoryModel.all();
    p.then(rows => {
        console.log(rows);
        res.render('post', {
            categories: rows
        });
    }).catch(next);
});

router.get('/:id', (req, res, next) => {
    var id = req.params.id;

    postModel.single(id).then(rows => {
        var toRender = {}
        var others = {}
        var i = 1;
        rows.forEach(row => {
            if(row.postid == id) {
                toRender['main'] = row;
            } else {
                toRender[i] = row;
            }
            i++;
        });

        var entity = {
            postid: toRender['main'].postid,
            views: toRender['main'].views + 1
        }
        postModel.update(entity);
        res.render('post', {
            post: toRender['main'],
            others: toRender
        });
    }).catch(next);
});

module.exports = router;