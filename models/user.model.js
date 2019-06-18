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
    },

    update: entity => {
        return db.update('users', 'email', entity);
    },

    sigleByPermissions: permissions => {
        return db.load(`select * from users where permissions = '${permissions}'`);
    },

    updateUser: (id, entity) => {
        return db.load(`update Users set username = '${entity.username}', email = '${entity.email}' where id_User = '${id}';`)
    },

    updateWriter: (id, entity) => {
        return db.load(`update Users set username = '${entity.username}', email = '${entity.email}', pseudonym = '${entity.pseudonym}' where id_User = '${id}';`)
    },

    updateDate: (id, date) => {
        return db.load(`update Users set HSD = '${date}' where id_User = '${id}';`)
    },

    updatePermissions: (id, date) => {
        return db.load(`update Users set permissions = 1, HSD = '${date}' where id_User = '${id}'`)
    },

    updatePer: id => {
        return db.load(`update Users set permissions = 0 where id_User = '${id}'`)
    },

    updatePassword: entity => {
        return db.load(`update Users set password = '${entity.password}' where id_User = '${entity.id_User}'`)
    },

    updateEditor: (id, entity) => {
        return db.load(`update Users set username = '${entity.username}', email = '${entity.email}', category = '${entity.category}' where id_User = '${id}';`)
    },

    delete: id => {
        return db.load(`delete from users where id_User = '${id}'`);
    },

    pageByName: (per, limit, offset) => {
        var query = `select * from users where permissions = '${per}' limit ${limit} offset ${offset};`
        return db.load(query);
    },

    countByName: per => {
        var query = `select count(*) as total from users where permissions = '${per}';`;
        return db.load(query);
    },

    getEmails: () => {
        var query = `select email from users`;
        return db.load(query);
    }
};