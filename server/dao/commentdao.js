const Dao = require('./dao.js');

module.exports = class CommentDao extends Dao {

    getComments(callback, ticket_id){
        super.query('SELECT * FROM comment WHERE ticket_id=? ORDER BY post_date', [ticket_id], callback);
    }

    postComment(callback, list){
        super.query('INSERT INTO comment(comment_id, content,priority,post_date,ticket_id) VALUES (default,?,?,?,?)', list, callback);
    }
};
