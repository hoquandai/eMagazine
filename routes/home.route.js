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
        console.log(cn);

        var posts = postModel.loadForHome(cn);
        posts.then(rows => {
            var entity = {};
            var myentity = {};
            var categories = {};
            var i = 0;
            
            myentity['names'] = 'top3';
            myentity['posts'] = rows[i];
            categories[0] = myentity;
            i++;

            cn.forEach(c => { 
                var newentity = {}
                newentity.names = c;
                //console.log("MYENTITY: " + newentity.names);
                newentity.posts = rows[i];
                categories[i] = newentity;
                catenames[i] = c;
                i++;
            });

            entity['catenames'] = catenames;
            entity['categories'] = categories;
            //console.log("CATENAME: " + entity['catenames']);
            //console.log("CATES: " + categories[0]['names']);
            //console.log("CATES: " + categories[1]['names']);
            res.render('/home', entity);
        }).catch(next)
    }).catch(next);
})

module.exports = router;