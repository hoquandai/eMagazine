var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('info/login', {layout: false});
})

router.post('/', (req, res, next) => {
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

            return res.redirect('/');
        })
    })(req, res, next);
})

module.exports = router;