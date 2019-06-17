var express = require('express');
var categoryModel = require('../models/category.model')
var postModel = require('../models/post.model')
var router = express.Router();


router.get('/', (req, res, next) => {
    var cn = [];
    var catenames = categoryModel.catenames();
    catenames.then(rows => {
        var i = 0;
        rows.forEach(row => {
            cn[i] = row.cn;
            i++
        });
        //console.log(cn);

        var posts = postModel.loadForHome();
        posts.then(rows => {
            var entity = {};
            var top3 = {};
            var view10 = {};
            var new10 = {};
            
            //console.log("HERE");
            
            top3['name'] = 'top3';
            top3['posts'] = rows[0];

            view10['name'] = 'view10';
            view10['posts'] = rows[1];
            
            new10['name'] = 'date10';
            new10['posts'] = rows[2];

            entity['top3'] = top3;
            entity['view10'] = view10;
            entity['new10'] = new10;

            //console.log(entity['top3'].name);
            res.render('home', entity);
        }).catch(next)
    }).catch(next);
})

router.post('/', (req, res, next) => {
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