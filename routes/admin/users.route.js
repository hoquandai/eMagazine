var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var userModel = require('../../models/user.model');

var router = express.Router();

router.get('/is-available', (req, res, next) => {
    var user = req.query.name;
    userModel.signleByUserName(user).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }

        return res.json(true);
    })
});

router.get('/user', (req, res) => {
    userModel.sigleByPermissions(0)
        .then(rows => {
            if (rows.length > 0) {
                var page = req.query.page || 1;
                if (page < 1) page = 1;
                var limit = 8;
                var offset = (page - 1) * limit;

                Promise.all([
                    userModel.pageByName(rows[0].permissions, limit, offset),
                    userModel.countByName(rows[0].permissions),
                ])
                    .then(([value, count]) => {
                        var total = count[0].total;
                        var nPages = Math.floor(total / limit);
                        if (total % limit > 0) nPages++;
                        var pages = []
                        for (i = 1; i <= nPages; i++) {
                            var obj = { value: i, active: i === +page };
                            pages.push(obj);
                        }

                        res.render('admin/vwUsers/users', { error: false, user: value, pages: pages, layout: false, isUser: true })
                    })
                    .catch(err => {
                        console.log(err);
                        res.end('error occured');
                    })
            } else {
                res.render('admin/vwUsers/users', {
                    error: true,
                    layout: false
                });
            }
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
})

router.get('/writer', (req, res) => {
    userModel.sigleByPermissions(2)
        .then(rows => {
            if (rows.length > 0) {
                var page = req.query.page || 1;
                if (page < 1) page = 1;
                var limit = 8;
                var offset = (page - 1) * limit;

                Promise.all([
                    userModel.pageByName(rows[0].permissions, limit, offset),
                    userModel.countByName(rows[0].permissions),
                ])
                    .then(([value, count]) => {
                        var total = count[0].total;
                        var nPages = Math.floor(total / limit);
                        if (total % limit > 0) nPages++;
                        var pages = []
                        for (i = 1; i <= nPages; i++) {
                            var obj = { value: i, active: i === +page };
                            pages.push(obj);
                        }

                        res.render('admin/vwUsers/users', { error: false, user: value, pages: pages, layout: false, isWriter: true })
                    })
                    .catch(err => {
                        console.log(err);
                        res.end('error occured');
                    })
            } else {
                res.render('admin/vwUsers/users', {
                    error: true,
                    layout: false
                });
            }
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
})

router.get('/editor', (req, res) => {
    userModel.sigleByPermissions(3)
        .then(rows => {
            if (rows.length > 0) {
                var page = req.query.page || 1;
                if (page < 1) page = 1;
                var limit = 8;
                var offset = (page - 1) * limit;

                Promise.all([
                    userModel.pageByName(rows[0].permissions, limit, offset),
                    userModel.countByName(rows[0].permissions),
                ])
                    .then(([value, count]) => {
                        var total = count[0].total;
                        var nPages = Math.floor(total / limit);
                        if (total % limit > 0) nPages++;
                        var pages = []
                        for (i = 1; i <= nPages; i++) {
                            var obj = { value: i, active: i === +page };
                            pages.push(obj);
                        }

                        res.render('admin/vwUsers/users', { error: false, user: value, pages: pages, layout: false, isEditor: true })
                    })
                    .catch(err => {
                        console.log(err);
                        res.end('error occured');
                    })
            } else {
                res.render('admin/vwUsers/users', {
                    error: true,
                    layout: false
                });
            }
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
})

router.get('/subscriber', (req, res) => {
    userModel.sigleByPermissions(1)
        .then(rows => {
            if (rows.length > 0) {
                var page = req.query.page || 1;
                if (page < 1) page = 1;
                var limit = 8;
                var offset = (page - 1) * limit;

                Promise.all([
                    userModel.pageByName(rows[0].permissions, limit, offset),
                    userModel.countByName(rows[0].permissions),
                ])
                    .then(([value, count]) => {
                        value.forEach(user => {
                            if(moment(user.HSD).isAfter(moment())){
                                user.HSD = moment(user.HSD).format('YYYY-MM-DD');
                            } else {
                                user.permissions = 0;
                                userModel.updatePer(user.id_User);
                            }
                        });

                        var total = count[0].total;
                        var nPages = Math.floor(total / limit);
                        if (total % limit > 0) nPages++;
                        var pages = []
                        for (i = 1; i <= nPages; i++) {
                            var obj = { value: i, active: i === +page };
                            pages.push(obj);
                        }

                        res.render('admin/vwUsers/users', { error: false, user: value, pages: pages, layout: false, isSub: true })
                    })
                    .catch(err => {
                        console.log(err);
                        res.end('error occured');
                    })
            } else {
                res.render('admin/vwUsers/users', {
                    error: true,
                    layout: false
                });
            }
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
})

router.post('/subscriber/:id', (req, res) => {
    var id = req.params.id;
    userModel.signle(id)
        .then(rows => {
            if (rows.length > 0) {
                var newDate = rows[0].HSD;
                newDate = moment(moment(newDate).add(7, 'd')).format('YYYY-MM-DD');
                userModel.updateDate(rows[0].id_User, newDate);
                res.redirect('/admin/users/subscriber');
            } else {
                res.render('admin/vwUsers/users', {
                    error: true,
                    layout: false
                });
            }
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
})

router.get('/edit/:id', (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.render('admin/vwUsers/editUser', {
            error: true,
            layout: false,
        });
    }

    userModel.signle(id).then(rows => {
        if (rows.length > 0) {
            if (rows[0].permissions === 0) {
                res.render('admin/vwUsers/editUser', {
                    error: false,
                    user: rows[0],
                    layout: false,
                    isUser: true
                });
            }
            if (rows[0].permissions === 1) {
                res.render('admin/vwUsers/editUser', {
                    error: false,
                    user: rows[0],
                    layout: false,
                    isSub: true
                });
            }
            if (rows[0].permissions === 2) {
                res.render('admin/vwUsers/editUser', {
                    error: false,
                    user: rows[0],
                    layout: false,
                    isWriter: true
                });
            }
            if (rows[0].permissions === 3) {
                res.render('admin/vwUsers/editUser', {
                    error: false,
                    user: rows[0],
                    layout: false,
                    isEditor: true
                });
            }
        } else {
            res.render('admin/vwUsers/editUser', {
                error: true
            });
        }
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.get('/adduser', (req, res) => {
    res.render('admin/vwUsers/addUser', { layout: false, isUser: true });
})

router.get('/addsub', (req, res) => {
    res.render('admin/vwUsers/addUser', { layout: false, isSub: true });
})

router.get('/addwriter', (req, res) => {
    res.render('admin/vwUsers/addUser', { layout: false, isWriter: true });
})

router.get('/addeditor', (req, res) => {
    res.render('admin/vwUsers/addUser', { layout: false, isEditor: true });
})

router.post('/adduser', (req, res) => {
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
        // res.render('admin/vwUsers/addUser', { layout: false });
        res.redirect('/admin/users/user');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.post('/addwriter', (req, res) => {
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');

    var entity = {
        username: req.body.username,
        password: hash,
        email: req.body.email,
        dayOfBird: dob,
        pseudonym: req.body.pseudonym,
        permissions: 2
    };

    userModel.add(entity).then(id => {
        res.redirect('/admin/users/writer');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.post('/addsub', (req, res) => {
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    var exp = moment(req.body.exp, 'DD/MM/YYYY').format('YYYY-MM-DD');

    var entity = {
        username: req.body.username,
        password: hash,
        email: req.body.email,
        dayOfBird: dob,
        HSD: exp,
        permissions: 1
    };

    userModel.add(entity).then(id => {
        res.redirect('/admin/users/subscriber');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.post('/addeditor', (req, res) => {
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');

    var entity = {
        username: req.body.username,
        password: hash,
        email: req.body.email,
        dayOfBird: dob,
        permissions: 3
    };

    userModel.add(entity).then(id => {
        res.redirect('/admin/users/editor');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.post('/updateuser', (req, res) => {

    var entity = {
        username: req.body.username,
        email: req.body.email
    };
    userModel.updateUser(req.body.id_User, entity).then(n => {
        res.redirect('/admin/users/user');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.post('/updatesub', (req, res) => {

    var entity = {
        username: req.body.username,
        email: req.body.email
    };
    userModel.updateUser(req.body.id_User, entity).then(n => {
        res.redirect('/admin/users/subscriber');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.post('/updatewriter', (req, res) => {

    var entity = {
        username: req.body.username,
        email: req.body.email,
        pseudonym: req.body.pseudonym
    };
    userModel.updateWriter(req.body.id_User, entity).then(n => {
        res.redirect('/admin/users/writer');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.post('/updateeditor', (req, res) => {
    var entity = {
        username: req.body.username,
        email: req.body.email,
        category: req.body.categorySelect
    };
    userModel.updateEditor(req.body.id_User, entity).then(n => {
        res.redirect('/admin/users/editor');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.post('/deleteuser', (req, res) => {
    userModel.delete(req.body.id_User).then(n => {
        res.redirect('/admin/users/user');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.post('/deletewriter', (req, res) => {
    userModel.delete(req.body.id_User).then(n => {
        res.redirect('/admin/users/writer');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.post('/deleteeditor', (req, res) => {
    userModel.delete(req.body.id_User).then(n => {
        res.redirect('/admin/users/editor');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.post('/deletesub', (req, res) => {
    userModel.delete(req.body.id_User).then(n => {
        res.redirect('/admin/users/subscriber');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.post('/upgrade/:id', (req, res) => {
    var id = req.params.id;
    userModel.signle(id).then(rows => {
        var newDate = rows[0].HSD;
        newDate = moment(moment().add(7, 'd')).format('YYYY-MM-DD');
        userModel.updatePermissions(id, newDate).then(n =>{
            res.redirect('/admin/users/user');
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

module.exports = router;