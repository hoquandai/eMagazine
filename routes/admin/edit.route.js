var express = require('express');
var categoryModel = require('../../models/category.model');
var postModel = require('../../models/post.model');
var moment = require('moment');
var router = express.Router();
var fs = require('fs');

router.get('/', (req, res, next) => {
    var p = categoryModel.getSubs();
    p.then(rows => {
        console.log(rows);
        res.render('admin/edit', {
            maincate: rows[0],
            subcate1: rows[1],
            subcate2: rows[2],
            subcate3: rows[3],
            subcate4: rows[4]
        });
    }).catch(next);
})

router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    
    Promise.all([
        postModel.single(id),
        categoryModel.getSubs(),

        //postModel.update(post_entity),
    ]).then(([post, catenames]) => {
        console.log("cabname" + catenames[0].name);
        
        res.render('admin/edit',{
            post: post,
            maincate: catenames[0],
            subcate1: catenames[1],
            subcate2: catenames[2],
            subcate3: catenames[3],
            subcate4: catenames[4]
        })
        
    }).catch(next);
})

router.post('/:id', (req, res, next) => {
    var postid = req.params.id;
    var category = req.body.category;
    var tag1 = req.body.tag1;
    var tag2 = req.body.tag2;
    var tag3 = req.body.tag3;
    var date = moment(req.body.txtdatenew, 'DD/MM/YYYY').format('YYYY-MM-DD');
    var state = 2;

    console.log(postid + "|" + category + " | " + tag1 + " | " + tag2 + " | " + tag3 + " | " + date + " | " + state);
    
    var entity = {
        postid: postid,
        category: category,
        tag1: tag1,
        tag2: tag2,
        tag3: tag3,
        date: date,
        state: 2
    }

    
    postModel.update(entity)
        .then(postid => {
            console.log("ID" + postid);
            res.redirect('back');
        })
        .catch(next);
        
})
module.exports = router;