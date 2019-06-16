var express = require('express');
var categoryModel = require('../../models/category.model')
var postModel = require('../../models/post.model')
var router = express.Router();


router.get('/:tag', (req, res, next) => {
    var tag = req.params.tag;

    var posts = postModel.getPostsByTag(tag);
    posts.then(rows => {
        res.render('reader/tag', { posts: rows, tag: tag });
    }).catch(next)
});

router.post('/:tag', (req, res, next) => {
    var searchString = req.body.search;
    console.log(searchString);
    var posts = postModel.getPostsBySearchString(searchString);
    posts.then(rows => {
        res.render('reader/search', { posts: rows, search: searchString });
    }).catch(err => {
        console.log(err);
        next
    })
});
module.exports = router;