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
        var query = `select * from posts where postid = ${id};`
        return db.load(query);
    },

    add: entity => {
        return db.add('posts', entity);
    },

    update: entity => {
        return db.update('posts', 'postid', entity);
    },

    delete: id => {
        return db.delete('posts', 'postid', id);
    },

    loadForHome: () => {
        // top 3 posts by views
        var query = 'select * from posts where premium != 1 order by views desc limit 3;'
        
        // top 10 posts by views each cate
        query += `select * from posts where premium != 1 order by views desc limit 12;`;
       
        // top 10 posts by date each cate
        query += `select * from posts where premium != 1 order by date desc limit 12;`;

        // top 10 posts premium for subscriber
        query += `select * from posts where premium = 1 limit 12;`;

        return db.load(query);
    },

    getPostsByTag: tag => {
        var query = `SELECT * FROM posts WHERE MATCH(tag1, tag2, tag3) AGAINST (N'${tag}') order by premium desc`;
        return db.load(query);
    },

    getPostsBySearchString: search => {
        var query = `SELECT * FROM posts WHERE MATCH(title, summary, content) AGAINST (N'${search}') order by premium desc;`
        return db.load(query);
    },

    postByState: states => {
        //console.log(catenames);
        var query = ``;
        states.forEach(state => {
            //console.log(catename);
            query += `select * from posts where state = N'${state}';`;
        });
        return db.load(query);
    },

    pageByCate: (cate, limit, offset) => {
        var query = `select * from posts where category = N'${cate}' order by premium desc limit ${limit} offset ${offset};`
        return db.load(query);
    },

    countByCate: cate => {
        var query = `select count(*) as total from posts where category = N'${cate}';`;
        return db.load(query);
    },

    relatedPost: id => {
        var query = `select p.* from posts p where p.category in (select category from posts where postid = ${id}) and p.postid != ${id} order by views desc limit 8;`;
        return db.load(query);
    },

    thumbnailPost: limit => {
        var query = `select * from posts order by views desc limit ${limit};`
        return db.load(query);
    },

    mediumPost: (limit, offset) => {
        var query = `select * from posts order by views desc limit ${limit} offset ${offset};`
        return db.load(query);
    },

    featuredPost: limit => {
        var query = `select * from posts order by date desc limit ${limit};`
        return db.load(query);
    },

    getAllTags: (limit, offset) => {
        var query = `select postid, tag1, tag2, tag3 from posts limit ${limit} offset ${offset};`;
        return db.load(query);
    },

    countPosts: () => {
        var query = `select count(*) as total from posts;`
        return db.load(query);
    },

    getPremiumByCate: catename => {
        var query = `select * from posts where category = N'${catename}' order by premium desc;`
        return db.load(query);
    },

    getPremiumPosts: () => {
        var query = `select * from posts order by premium desc;`
        return db.load(query);
    },

    getPremiumSearch: search => {
        var query = `SELECT * FROM posts WHERE MATCH(title, summary, content) AGAINST (N'${search}') order by premium desc;`
        return db.load(query);
    },

    getPremiumTag: tag => {
        var query = `SELECT * FROM posts WHERE MATCH(tag1, tag2, tag3) AGAINST (N'${tag}')`;
        return db.load(query);
    },

    countPostsBySearchString: (search) => {
        var query = `SELECT count(*) as total FROM posts WHERE MATCH(title, summary, content) AGAINST (N'${search}');`
        return db.load(query);
    },

    postByWriter: (states, writerid) => {
        //console.log(catenames);
        var query = ``;
        states.forEach(state => {
            //console.log(catename);
            query += `select * from posts where state = N'${state}' and writer = ${writerid};`;
        });
        return db.load(query);
    },
};