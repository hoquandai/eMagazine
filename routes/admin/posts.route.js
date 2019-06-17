var express = require('express');
var categoryModel = require('../../models/category.model')
var postModel = require('../../models/post.model')
var router = express.Router();

/*
router.get('/', (req, res, next) => {
    var p = categoryModel.all();
    p.then(rows => {
        console.log(rows);
        res.render('admin/posts', {
            categories: rows,
            layout: false
        });
    }).catch(next);
})
*/
router.get('/', (req, res, next) => {
    var states = [1,2,3,4];
    var posts = postModel.postByState(states);
    posts.then(rows => {
        console.log(rows);
        res.render('admin/posts', {
            post0 : rows[0],
            post1 : rows[1],
            post2 : rows[2],
            post3 : rows[3],
            layout: false
            
        });
    }).catch(next);
})

router.post('/', (req, res, next) => {
    var postid = req.body.postid;
    console.log("POSTID: " + postid);
    postModel.delete(postid);
        res.redirect('/admin/posts');

})

module.exports = router;