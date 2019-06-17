var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from tokens');
    },

    single: id => {
        return db.load(`select * from tokens where id = ${id}`);
    },

    getEmail: token => {
        return db.load(`select email from tokens where token = '${token}'`);
    },

    getPass: token => {
        return db.load(`select newpass from tokens where token = '${token}'`);
    },

    add: entity => {
        return db.add('tokens', entity);
    },

    delete: token => {
        return db.delete('tokens', 'token', token);
    },
};