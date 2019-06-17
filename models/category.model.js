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

    state: state => {
        return db.load(`select * from posts where state = ${state}`);
    },

    catenames: () => {
        return db.load(`select substr(catename, 18) as cn from catenames`);
        //return db.load(`select * from categories`);
    },

    single: id => {
        return db.load(`select * from categories where name = ${id}`);
    },

    add: entity => {
        return db.add('categories', entity);
    },

    update: entity => {
        return db.update('categories', 'cateid', entity);
    },

    delete: id => {
        return db.delete('categories', 'cateid', id);
    },

    signleById: id => {
        return db.load(`select * from categories where cateid = ${id}`);
    },

    pageByCate: (limit, offset) => {
        var query = `select * from categories limit ${limit} offset ${offset};`
        return db.load(query);
    },

    countByCate: () => {
        var query = `select count(*) as total from categories;`;
        return db.load(query);
    }
};