var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var cate = req.params.cate;
        var postid = req.params.postid;
        
        var dir = `./public/img/${cate}/${postid}`;
        fs.exists(dir, function(exists) {
            if (exists) { 
                console.log("Directory already exists");
                cb(null, dir);
            }
            else {
                fs.mkdir(dir,err => cb(err, dir))
            }
        })
        //fs.mkdir(dir,err => cb(err, dir))
        //cb(null, dir);
    },
    filename: function (req, file, cb) {
        var postid = req.params.postid;
        var type = req.params.type;

      cb(null, postid + '-' + type + '.jpg')
    }
  })
   
var upload = multer({ storage: storage })

module.exports = function (app) {
    app.post('/upload/large/:cate/:postid/:type', (req, res, next) => {
        upload.array('large')(req, res, err => {
            if (err) {
                return res.json({
                    error: err.message  
                });
            }

            res.json({});
        })
    });

    app.post('/upload/medium/:cate/:postid/:type', (req, res, next) => {
        upload.array('medium')(req, res, err => {
            if (err) {
                return res.json({
                    error: err.message  
                });
            }

            res.json({});
        })
    })

    app.post('/upload/small/:cate/:postid/:type', (req, res, next) => {
        upload.array('small')(req, res, err => {
            if (err) {
                return res.json({
                    error: err.message  
                });
            }

            res.json({});
        })
    })

    app.post('/upload/post/:cate/:postid/:type', (req, res, next) => {
        upload.array('post')(req, res, err => {
            if (err) {
                return res.json({
                    error: err.message  
                });
            }

            res.json({});
        })
    })

    app.post('/upload/thumb/:cate/:postid/:type', (req, res, next) => {
        upload.array('thumb')(req, res, err => {
            if (err) {
                return res.json({
                    error: err.message  
                });
            }

            res.json({});
        })
    })

    app.post('/upload/widget/:cate/:postid/:type', (req, res, next) => {
        upload.array('widget')(req, res, err => {
            if (err) {
                return res.json({
                    error: err.message  
                });
            }

            res.json({});
        })
    })
}