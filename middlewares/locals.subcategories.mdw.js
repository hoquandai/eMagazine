var subCategoryModel = require('../models/subcategories.model');

module.exports = (req, res, next) => {
  subCategoryModel.allWithDetails().then(rows => {
    res.locals.lcSubCategories = rows;
    //console.log(rows);
    next();
  })
}
