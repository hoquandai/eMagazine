var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from categories');
    },

    allWithDetails: () => {
        return db.load(`
        select c.cateid, c.name, c.subcate1, c.subcate2, c.subcate3, c.subcate4, c.link1, c.link2, c.link3, c.link4, c.link
        from categories c
        `);
    },

    single: id => {
        return db.load(`select * from categories where name = ${id}`);
    },

    add: entity => {
        return db.add('categories', entity);
    },

    update: entity => {
        return db.update('categories', 'id', entity);
    },

    delete: id => {
        return db.delete('categories', 'id', id);
    }
};