var express = require('express');
var categoryModel = require('../models/category.model')
var postModel = require('../models/post.model');
var commentModel = require('../models/comment.model')

var router = express.Router();

router.get('/:id', (req, res, next) => {
    var id = req.params.id;

    Promise.all([
        postModel.single(id),
        postModel.relatedPost(id),
        commentModel.getCommentByPostid(id),
        postModel.thumbnailPost(3),
        postModel.mediumPost(2, 3),
        postModel.featuredPost(2),
    ]).then(([post, relatedPost, comments, thumbnails, mediums, featureds]) => {
        console.log(post[0].postid);
        var entity = {
            postid: post[0].postid,
            views: post[0].views + 1
        }
        postModel.update(entity);

        res.render('post', { post: post[0], others: relatedPost, comments: comments, thumbnails: thumbnails, mediums: mediums, featureds: featureds })
    })
        .catch(next)
});

router.post('/:id', (req, res, next) => {
    if (req.body.search) {
        var searchString = req.body.search;
        console.log(searchString);
        var posts = postModel.getPostsBySearchString(searchString);
        posts.then(rows => {
            res.render('reader/search', { posts: rows, search: searchString });
        }).catch(err => {
            console.log(err);
            next
        })
    } else {
        var username = req.body.username;
        var email = req.body.email;
        var comment = req.body.comment;
        var postid = req.params.id;

        console.log(postid + " | " + username + " | " + email + " | " + comment);

        var entity = {
            postid: postid,
            username: username,
            email: email,
            comment: comment
        }

        Promise.all([
            commentModel.add(entity),
            commentModel.countComments(postid),
            //postModel.update(post_entity),
        ]).then(([add, comments]) => {
            console.log("COMMENTS: " + comments[0].total);
            var post_entity = {
                postid: postid,
                comments: comments[0].total + 1
            }
            postModel.update(post_entity);
    
            res.redirect('back');
            
        }).catch(next)
    }
});

module.exports = router;