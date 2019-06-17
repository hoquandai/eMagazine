var express = require('express');
var categoryModel = require('../../models/category.model');

var router = express.Router();

router.get('/', (req, res) => {
  var page = req.query.page || 1;
  if (page < 1) page = 1;
  var limit = 8;
  var offset = (page - 1) * limit;

  Promise.all([
    categoryModel.pageByCate(limit, offset),
    categoryModel.countByCate(),
  ]).then(([rows, count]) => {
    var total = count[0].total;
    var nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++; 
    var pages = []
    for (i = 1; i <= nPages; i++) {
      var obj = { value: i, active: i === +page };
      pages.push(obj);
    }

    res.render('admin/vwCategories/categories', { categories: rows, pages: pages, layout: false })
  })
    .catch(err => {
      console.log(err);
      res.end('error occured');
    })
})

router.get('/edit/:id', (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('admin/vwCategories/edit', {
      error: true,
      layout: false
    });
  }

  categoryModel.signleById(id).then(rows => {
    if (rows.length > 0) {
      res.render('admin/vwCategories/edit', {
        error: false,
        category: rows[0],
        layout: false
      });
    } else {
      res.render('admin/vwCategories/edit', {
        error: true,
        layout: false
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.get('/add', (req, res) => {
  res.render('admin/vwCategories/add', { layout: false });
})

router.post('/add', (req, res) => {
  categoryModel.add(req.body).then(id => {
    res.render('admin/vwCategories/add', { layout: false });
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/update', (req, res) => {
  categoryModel.update(req.body).then(n => {
    res.redirect('/admin/categories');
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
})

module.exports = router;