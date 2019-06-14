var express = require('express');
var passport = require('passport');
var auth = require('../../middlewares/auth');

var router = express.Router();

router.get('/login', (req, res, next) => {
    res.render('info/login', {layout: false});
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { 
            return next(err); 
        }

        if (!user) { 
            return res.render('info/login', {
                layout: false,
                err_message: info.message
            }) 
        }

        req.logIn(user, err => {
            if (err){
                return next(err);
            }

            console.log(user);
            req.session.user = user.username;

            req.session.save(function(err) {
                console.log("SESSION: " + req.session.user);
            })

            return res.redirect('/');
        })
    })(req, res, next);
})

router.get('/profile', auth, (req, res, next) => {
    res.end('hello');
})

module.exports = router;