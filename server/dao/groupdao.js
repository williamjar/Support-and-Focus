const Dao = require('./dao.js');

module.exports = class GroupDao extends Dao {

    getAll(callback){
        super.query('SELECT * FROM group_list', [], callback);
    }

};
