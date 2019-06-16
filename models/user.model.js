var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from Users');
    },

    signle: id_User => {
        return db.load(`select * from Users where id_User = ${id_User}`);
    },

    signleByUserName: username => {
        return db.load(`select * from Users where username = '${username}'`);
    },

    add: entity => {
        return db.add('Users', entity);
    },

    update: (id, entity) => {
        return db.load(`update Users set username = '${entity.username}', email = '${entity.email}', password = '${entity.password}', dayOfBird = '${entity.dayOfBird}', permissions = '${entity.permissions}' where id_User = '${id}';`);
    }
};