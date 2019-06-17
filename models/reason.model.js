var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from reasons');
    },

    add: entity => {
        return db.add('reasons', entity);
    },
    
    delete: id => {
        return db.delete('reasons', 'id', id);
    },

};