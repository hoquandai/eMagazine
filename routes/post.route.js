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
        if(rows.length > 0) {
            console.log("VALUE: " + rows[0].views);
            var entity = {
                postid: rows[0].postid,
                views: rows[0].views + 1
            }
            postModel.update(entity);
            res.render('post', {
                post: rows[0],               
            });
        }
    }).catch(next);
});

module.exports = router;