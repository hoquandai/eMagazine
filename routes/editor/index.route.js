var express = require('express');
var categoryModel = require('../../models/category.model')
var router = express.Router();
var postModel = require('../../models/post.model')
var reasonModel = require('../../models/reason.model')

router.get('/', (req, res, next) => {
    var state = [1,2,3,4];
    var posts = postModel.postByState(state);
    posts.then(rows => {
        console.log(rows);
        res.render('editor/index', {
            post0 : rows[0],
            post1 : rows[1],
            post2 : rows[2],
            post3 : rows[3]
        });
    }).catch(next);
})

router.post('/', (req, res, next) => {
        var username = req.body.username;
        var reason = req.body.reason;
        var postid = req.body.postid;

        console.log(username + " | " + reason + " | " + postid);
        var entity = {
            username: username,
            reason: reason,
            postid: postid
        }
        reasonModel.add(entity).then(id =>{
            res.redirect('/editor');
        
    }).catch(next);
});

module.exports = router;