var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from posts');
    },

    allByCategory: catename => {
        return db.load(`select * from posts where category = N'${catename}'`);
    },

    partPostsByCate: catename => {
        return db.load(`select * from posts where category = N'${catename}' limit 4;select * from posts where category = N'${catename}' limit 4, 2;select * from posts where category = N'${catename}' limit 6, 2;select * from posts where category = N'${catename}' limit 8, 2`);
    },

    allTop: () => {
        return db.load(`select * from posts order by views desc limit 8`);
    },

    topByCate: catenames => {
        //console.log(catenames);
        var query = `select * from posts order by views desc limit 8;`;
        catenames.forEach(catename => {
            //console.log(catename);
            query += `select * from posts where category = N'${catename}' order by views desc limit 8;`;
        });
        return db.load(query);
    },

    newByCate: catenames => {
        //console.log(catenames);
        var query = `select * from posts order by date desc limit 8;`;
        catenames.forEach(catename => {
            //console.log(catename);
            query += `select * from posts where category = N'${catename}' order by date desc limit 8;`;
        });
        return db.load(query);
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
    },

    loadForHome: catenames => {
        var query = 'select * from posts order by views desc limit 3;'
        
        catenames.forEach(catename => {
            //console.log(catename);
            query += `select * from posts where category = N'${catename}' order by views desc limit 10;`;
            query += `select * from posts where category = N'${catename}' order by date desc limit 10;`;
            query += `select * from posts where category = N'${catename}' order by date desc limit 1;`;
        });

        return db.load(query);
    },

};