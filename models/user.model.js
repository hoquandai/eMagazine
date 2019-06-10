var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from Users');
    },

    signle: id_User => {
        return db.load(`select * from Users where id = ${id_User}`);
    },

    signleByUserName: username => {
        return db.load(`select * from Users where username = '${username}'`);
    },

    add: entity => {
        return db.add('Users', entity);
    }
};