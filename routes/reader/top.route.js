var express = require('express');
// var categoryModel = require('../../models/category.model')
var postModel = require('../../models/post.model')
var router = express.Router();


router.get('/', (req, res, next) => {
    var p = postModel.allTop();
    // var ns = postModel.topByCategory('nongsan');
    //console.log("NONGSAN:\n" +  + "\nEND");

    p.then(rows => {
        console.log(rows);
        res.render('reader/top', {
            posts: rows[0],
            nongsan: rows[1],
            haisan: rows[2],
            giaoduc: rows[3],
            chinhtri: rows[4],
            active: true
        });
    }).catch(next);
})

module.exports = router;