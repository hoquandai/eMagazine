var express = require('express');
var categoryModel = require('../../models/category.model')
var postModel = require('../../models/post.model')
var router = express.Router();


router.get('/', (req, res, next) => {
    var cn = [];
    var catenames = categoryModel.getCateName();
    catenames.then(rows => {
        var i = 0;
        if(rows[0].length > 0) {
            rows[0].forEach(row => {
                cn[i] = row.catename;
                i++
            });
        }
        
        if (rows[1].length > 0) {
            rows[1].forEach(row => {
                cn[i] = row.catename;
                i++
            });
        }
        
        if (rows[2].length > 0) {
            rows[2].forEach(row => {
                cn[i] = row.catename;
                i++
            });
        }
        
        if(rows[3].length > 0) {
            rows[3].forEach(row => {
                cn[i] = row.catename;
                i++
            });
        }
        
        if (rows[4].length > 0) {
            rows[4].forEach(row => {
                cn[i] = row.catename;
                i++
            });
        }
        console.log(cn);

        var posts = postModel.newByCate(cn);
        posts.then(rows => {
            var entity = {};
            var myentity = {};
            var categories = {};
            var i = 0;
            
            myentity['names'] = 'all';
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
            res.render('reader/news', entity);
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