var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var userModel = require('../../models/user.model');

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

router.get('/', (req, res, next) => {
    res.render('info/signup', {
        layout: false
    })
});

router.post('/', (req, res, next) => {
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');

    var entity = {
        username: req.body.username,
        password: hash,
        email: req.body.email,
        dayOfBird: dob
    };

    userModel.add(entity).then(id => {
        res.redirect('/login');
    })
});

module.exports = router;