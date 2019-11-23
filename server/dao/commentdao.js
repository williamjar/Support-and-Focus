const Dao = require('./dao.js');

module.exports = class CommentDao extends Dao {

    getComments(callback, ticket_id){
        super.query('select * from comment where ticket_id=? ORDER BY post_date', [ticket_id], callback);
    }

    postComment(callback, list){
        super.query('INSERT INTO comment(content,priority,post_date,ticket_id) VALUES (?,?,?,?)', list, callback);
    }
}
