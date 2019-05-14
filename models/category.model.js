var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from categories');
    },

    allWithDetails: () => {
        return db.load(`
        select c.id, c.name
        from categories c
        `);
    },

    subcate: id => {
        return db.load(`
        select  sc.subid, sc.subname from subcategories sc 
        where sc.cateid = ${id}`);
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