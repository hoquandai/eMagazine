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
    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 8;
    var offset = (page - 1) * limit;
    
    Promise.all([
        postModel.pageByCate(catename, limit, offset), 
        postModel.countByCate(catename),
    ]).then(([rows, count]) => {
        var total = count[0].total;
        var nPages = Math.floor(total/limit);

        if (total % limit > 0) nPages++;
        console.log("PAGES: " + nPages);
        var pages = []
        for(i=1;i<=nPages;i++) {
            var obj = {value: i, active: i === +page};
            pages.push(obj);
        }

        res.render('reader/category', { category: catename, posts: rows, pages: pages})
    })
      .catch(err => {
          console.log(err);
          res.end('error occured');
      })
})

router.post('/:catename', (req, res, next) => {
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