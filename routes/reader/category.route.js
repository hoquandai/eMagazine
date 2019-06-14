var express = require('express');
var categoryModel = require('../../models/category.model')
var postModel = require('../../models/post.model')
var router = express.Router();


router.get('/', (req, res, next) => {
    var posts = postModel.partPostsByCate("chinhtri");
    posts.then(rows => {
        console.log(rows);
        res.render('reader/chinhtri', {
            p4: rows[0],
            p6: rows[1],
            p8: rows[2],
            p10: rows[3]
        });
    }).catch(next); 
})

router.get('/:catename', (req, res, next) => {
    var catename = req.params.catename;

    var posts = postModel.partPostsByCate(catename);
    posts.then(rows => {
        console.log(rows);
        res.render('reader/category', {
            p4: rows[0],
            p6: rows[1],
            p8: rows[2],
            p10: rows[3]
        });
    }).catch(next); 
})

module.exports = router;