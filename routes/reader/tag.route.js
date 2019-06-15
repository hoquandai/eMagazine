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

module.exports = router;