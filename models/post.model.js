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
        //var query = `select * from posts where postid = ${id} limit 1;`
        var query = `select * from posts where category in (select category from posts where postid = ${id}) order by views desc limit 8;`;
        //query += `select * from posts where postid = ${id} limit 1;`
        return db.load(query);
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

    loadForHome: () => {
        // top 3 posts by views
        var query = 'select * from posts order by views desc limit 3;'
        
        // top 10 posts by views each cate
        query += `select * from posts order by views desc limit 10;`;
       
        // top 10 posts by date each cate
        query += `select * from posts order by date desc limit 10;`;

        return db.load(query);
    },

    getPostsByTag: tag => {
        var query = `SELECT * FROM posts WHERE MATCH(tag1, tag2, tag3) AGAINST (N'${tag}')`;
        return db.load(query);
    },

    getPostsBySearchString: search => {
        var query = `SELECT * FROM posts WHERE MATCH(title, summary, content) AGAINST (N'${search}');`
        return db.load(query);
    }
};