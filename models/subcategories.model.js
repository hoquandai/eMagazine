var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from subcategories');
    },

    allWithDetails: () => {
        return db.load(`
        select sc.subid, sc.subname, sc.cateid
        from subcategories sc
        `);
    },

    single: id => {
        return db.load(`select * from subcategories where name = ${id}`);
    },

    add: entity => {
        return db.add('subcategories', entity);
    },

    update: entity => {
        return db.update('subcategories', 'subid', entity);
    },

    delete: id => {
        return db.delete('subcategories', 'subid', id);
    }
};