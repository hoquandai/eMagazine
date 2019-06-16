var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from comments');
    },

    add: entity => {
        return db.add('comments', entity);
    },
    
    delete: id => {
        return db.delete('comments', 'id', id);
    },

    getCommentByPostid: postid => {
        var query = `select * from comments where postid = ${postid} order by id;`;
        return db.load(query);
    },

    countComments: postid => {
        var query = `select count(*) as total from comments where postid = ${postid};`;
        return db.load(query);
    }
};