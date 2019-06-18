var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');
var userModel = require('../../models/user.model');
var auth = require('../../middlewares/auth');

var router = express.Router();

router.get('/is-available', (req, res, next) => {
    var user = req.query.username;
    userModel.signleByUserName(user).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }

        return res.json(true);
    })
});

router.get('/signup', (req, res, next) => {
    res.render('info/signup', {
        layout: false
    })
});

router.post('/signup', (req, res, next) => {
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');

    var entity = {
        username: req.body.username,
        password: hash,
        email: req.body.email,
        dayOfBird: dob,
        permissions: 0
    };

    userModel.add(entity).then(id => {
        res.redirect('/account/login');
    })
});

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

            return res.redirect('/');
        })
    })(req, res, next);
})

router.get('/profile', auth, (req, res, next) => {
    userModel.signle(res.locals.authUser.id_User).then(value => {
        value[0].dayOfBird = moment(value[0].dayOfBird).format('YYYY-MM-DD');
        res.render('info/user_detail', {layout: false, user: value});
    })
})

router.get('/changeprofile', (req, res, next) => {
    res.render('info/user_change', {layout: false});
})

router.post('/changeprofile', (req, res, next) => {
    var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(req.user.id_User);
    var entity = {
        username: req.body.username,
        password: req.user.password,
        email: req.body.email,
        dayOfBird: dob,
        permissions: 0
    };

    userModel.update(req.user.id_User, entity).then(id => {
        res.redirect('/');
    })
})

router.get('/changepassword', (req, res, next) => {
    res.render('info/changePassword', { layout: false });
})

router.post('/changepassword', (req, res, next) => {
    userModel.signle(res.locals.authUser.id_User)
        .then(value => {
            var ret = bcrypt.compareSync(req.body.password, value[0].password);
            if (ret) {
                var saltRounds = 10;
                var hash = bcrypt.hashSync(req.body.newpassword, saltRounds);

                var entity = {
                    id_User: req.user.id_User,
                    password: hash
                }

                userModel.updatePassword(entity).then(n => {
                    res.redirect('/');
                }).catch(err => {
                    res.end('error occured.')
                });
            }
            else {
                return res.render('info/changepassword', {
                    layout: false,
                    err_message: true
                })
            }
        }).catch(next);
})

router.post('/logout', auth, (req, res, next) => {
    req.logOut();
    res.redirect('/account/login');
  })

module.exports = router;