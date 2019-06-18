var express = require('express');
var categoryModel = require('../../models/category.model');
var postModel = require('../../models/post.model');
var moment = require('moment');
var router = express.Router();
var fs = require('fs');

router.get('/', (req, res, next) => {
    var p = categoryModel.getSubs();
    p.then(rows => {
        res.render('writer/post', {
            maincate: rows[0],
            subcate1: rows[1],
            subcate2: rows[2],
            subcate3: rows[3],
            subcate4: rows[4],
        });
    }).catch(next);
})

router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    postModel.single(id).then(rows => {
        console.log("POSTID: " + rows[0].postid);
        res.render('writer/edit', {
            post : rows
        });

    }).catch(next);
})

router.post('/:id', (req, res, next) => {
    var postid = req.params.id;
    var category = req.body.category;
    var tag1 = req.body.tag1;
    var tag2 = req.body.tag2;
    var tag3 = req.body.tag3;
    var date = moment(req.body.txtdatenew, 'DD/MM/YYYY').format('YYYY-MM-DD');
    var title = req.body.title;
    var summary = req.body.summary;
    var content = req.body.content;
    var state = req.body.state;

    console.log(postid + "|" + category + " | " + tag1 + " | " + tag2 + " | " + tag3 + " | " + date + " | " + state);
    
    var entity = {
        postid: postid,
        category: category,
        tag1: tag1,
        tag2: tag2,
        tag3: tag3,
        date: date,
        title: title,
        summary: summary,
        content: content,
        state: state
    }

    
    postModel.update(entity)
        .then(postid => {
            console.log("ID" + postid);
            res.redirect('back');
        })
        .catch(next);
        
})
module.exports = router;