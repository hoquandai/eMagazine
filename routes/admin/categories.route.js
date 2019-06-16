var express = require('express');
var categoryModel = require('../../models/category.model');

var router = express.Router();

router.get('/', (req, res) => {
  categoryModel.all()
    .then(rows => {
      res.render('admin/vwCategories/categories', {
        categories: rows,
        layout: false
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
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
        error: true
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.get('/add', (req, res) => {
  res.render('admin/vwCategories/add', {layout: false});
})

router.post('/add', (req, res) => {
  categoryModel.add(req.body).then(id => {
    res.render('admin/vwCategories/add', {layout: false});
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