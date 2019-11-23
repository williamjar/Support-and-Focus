const Dao = require("./dao.js");

module.exports = class TicketDao extends Dao {


    getAll(callback) {
        super.query("SELECT * FROM ticket WHERE NOT priority = 3 ORDER BY post_date DESC LIMIT 10", [], callback);
    }

    getLatest(callback) {
        super.query("SELECT * FROM ticket ORDER BY post_date LIMIT 1", [], callback);
    }

    createOne(callback, list){
        super.query('INSERT INTO ticket(headline, content, priority, picture, post_date,email,group_id, author) VALUES (?,?,?,?,?,?,?,?)', list, callback);
    }

    solveOne(callback, article_id){
        super.query('UPDATE ticket SET priority = 3 WHERE article_id=?',[article_id], callback);
    }

    updateOne(callback, list){
        super.query('UPDATE ticket SET headline=?,content=?,priority=?,picture=?,email=?,group_id=?,author=? WHERE ticket_id =?', list, callback);
    }

    getByGroup(callback, group_id){
        super.query('SELECT * FROM ticket WHERE group_id=? ORDER BY post_date DESC', [group_id], callback);
    }

    getByPriority(callback, priority){
        super.query('SELECT * FROM ticket WHERE priority=? ORDER BY post_date DESC', [priority], callback);
    }

};