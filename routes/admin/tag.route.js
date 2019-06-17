var express = require('express');
var categoryModel = require('../../models/category.model')
var postModel = require('../../models/post.model')
var router = express.Router();


router.get('/', (req, res, next) => {
    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 10;
    var offset = (page - 1) * limit;
    
    Promise.all([
        postModel.getAllTags(limit, offset), 
        postModel.countPosts(),
    ]).then(([rows, count]) => {
        var total = count[0].total;
        var nPages = Math.floor(total/limit);

        if (total % limit > 0) nPages++;
        console.log("PAGES: " + nPages);

        var pages = []
        for(i=1;i<=nPages;i++) {
            var obj = {value: i, active: i === +page};
            pages.push(obj);
        }

        res.render('admin/vwTags/tags', { post_tag: rows, pages: pages, layout: false,})
    }).catch(next);
})

router.get('/edit/:id', (req, res) => {
    var id = req.params.id;
    var page = req.query.page;
    if (isNaN(id)) {
      res.render('admin/vwTags/edit', {
        error: true,
        layout: false
      });
    }
  
    postModel.single(id).then(rows => {
      if (rows.length > 0) {
        res.render('admin/vwTags/edit', {
          error: false,
          post: rows[0],
          layout: false,
          page: page,
        });
      } else {
        res.render('admin/vwTags/edit', {
          error: true
        });
      }
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })

  router.post('/update', (req, res) => {
      var entity = {
          postid: req.body.postid,
          tag1: req.body.tag1,
          tag2: req.body.tag2,
          tag3: req.body.tag3
      }

    postModel.update(entity).then(n => {
      res.redirect(`/admin/tags?page=${req.body.page}`);
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })

  /*
  router.get('/add', (req, res) => {
    res.render('admin/vwTags/add', {layout: false});
  })
  
  router.post('/add', (req, res) => {
    categoryModel.add(req.body).then(id => {
      res.render('admin/vwCategories/add', {layout: false});
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })
  
  
  
  router.post('/delete', (req, res) => {
    categoryModel.delete(req.body.cateid).then(n => {
      res.redirect('/admin/categories');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })*/

module.exports = router;