var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from posts');
    },

    allByCategory: catename => {
        return db.load(`select * from posts where category = N'${catename}'`);
    },

    partPostsByCate: catename => {
        return db.load(`select * from posts where category = N'${catename}' limit 4;select * from posts where category = N'${catename}' limit 4, 2;
        select * from posts where category = N'${catename}' limit 6, 2;select * from posts where category = N'${catename}' limit 8, 2`);
    },

    allTop: () => {
        return db.load(`select * from posts order by views desc limit 10;select * from posts where category = N'nongsan' order by views desc limit 10;
        select * from posts where category = N'haisan' order by views desc limit 10;select * from posts where category = N'giaoduc' order by views desc limit 10
        ;select * from posts where category = N'chinhtri' order by views desc limit 10`);
    },

    single: id => {
        return db.load(`select * from posts where postid = ${id}`);
    },

    add: entity => {
        return db.add('posts', entity);
    },

    update: entity => {
        return db.update('posts', 'postid', entity);
    },

    delete: id => {
        return db.delete('posts', id, id);
    }
};