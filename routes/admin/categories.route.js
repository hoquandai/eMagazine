var express = require('express');
var categoryModel = require('../../models/category.model');

var router = express.Router();

router.get('/', (req, res) => {
  if (res.locals.authUser.permissions === 4) {
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
  } else {
    res.end('Ban khong co quyen truy cap!');
  }
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
  var cateid = req.body.cateid;
  var name = req.body.name;
  var link = req.body.link;
  var subcate1 = req.body.subcate1;
  var link1 = req.body.link1;
  var subcate2 = req.body.subcate2;
  var link2 = req.body.link2;
  var subcate3 = req.body.subcate3;
  var link3 = req.body.link3;
  var subcate4 = req.body.subcate4;
  var link4 = req.body.link4;

  var entity = {}
  var catenames = {}

  if (cateid != "") { entity['cateid'] = cateid};
  if (link != "") { entity['link'] = link; catenames['catename'] = link; categoryModel.addCateName(catenames)};
  if (subcate1 != "") { entity['subcate1'] = subcate1};
  if (name != "") { entity['name'] = name};
  if (link1 != "") { entity['link1'] = link1 ; catenames['catename'] = link1; categoryModel.addCateName(catenames)};
  if (subcate2 != "") { entity['subcate2'] = subcate2};
  if (link2 != "") { entity['link2'] = link2; catenames['catename'] = link2; categoryModel.addCateName(catenames)};
  if (subcate3 != "") { entity['subcate3'] = subcate3};
  if (link3 != "") { entity['link3'] = link3; catenames['catename'] = link3; categoryModel.addCateName(catenames)};
  if (subcate4 != "") { entity['subcate4'] = subcate4};
  if (link4 != "") { entity['link4'] = link4; catenames['catename'] = link4; categoryModel.addCateName(catenames)};

  
  categoryModel.add(entity).then(id => {
    res.render('admin/vwCategories/add', {layout: false});
  }).catch(err => {
    console.log(err);
    res.end('[!]error occured.\r[!] duplicated link found')
  });
})

router.post('/update', (req, res) => {
  var cateid = req.body.cateid;
  var name = req.body.name;
  var link = req.body.link;
  var subcate1 = req.body.subcate1;
  var link1 = req.body.link1;
  var subcate2 = req.body.subcate2;
  var link2 = req.body.link2;
  var subcate3 = req.body.subcate3;
  var link3 = req.body.link3;
  var subcate4 = req.body.subcate4;
  var link4 = req.body.link4;

  var entity = {}

  if (cateid != "") { entity['cateid'] = cateid};
  if (link != "") { entity['link'] = link; catenames['catename'] = link; categoryModel.addCateName(catenames)};
  if (subcate1 != "") { entity['subcate1'] = subcate1};
  if (name != "") { entity['name'] = name};
  if (link1 != "") { entity['link1'] = link1; catenames['catename'] = link1; categoryModel.addCateName(catenames)};
  if (subcate2 != "") { entity['subcate2'] = subcate2};
  if (link2 != "") { entity['link2'] = link2; catenames['catename'] = link2; categoryModel.addCateName(catenames)};
  if (subcate3 != "") { entity['subcate3'] = subcate3};
  if (link3 != "") { entity['link3'] = link3; catenames['catename'] = link3; categoryModel.addCateName(catenames)};
  if (subcate4 != "") { entity['subcate4'] = subcate4; };
  if (link4 != "") { entity['link4'] = link4; catenames['catename'] = link4; categoryModel.addCateName(catenames)};

  categoryModel.update(entity).then(n => {
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