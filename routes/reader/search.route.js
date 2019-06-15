var express = require('express');
var categoryModel = require('../../models/category.model')
var postModel = require('../../models/post.model')
var router = express.Router();

router.get('/', (req, res, next) => {
    var search = " ";

    var posts = postModel.getPostsBySearchString(search);
    posts.then(rows => {
        res.render('reader/search', { posts: rows, search: search });
    }).catch(next)
})

router.get('/:search', (req, res, next) => {
    var search = req.params.search;

    var posts = postModel.getPostsBySearchString(search);
    posts.then(rows => {
        res.render('reader/search', { posts: rows, search: search });
    }).catch(next)
});

module.exports = router;