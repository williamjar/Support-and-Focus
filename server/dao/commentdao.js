const Dao = require('./dao.js');

module.exports = class CommentDao extends Dao {

    getComments(callback, ticket_id){
        console.log("ticket id for kommentar " + ticket_id);
        super.query('SELECT content FROM comment WHERE ticket_id=? ORDER BY post_date', [ticket_id], callback);
    }

    postComment(callback, list){
        console.log("dette er listen" + list);
        super.query('INSERT INTO comment(comment_id, content,priority,post_date,ticket_id) VALUES (default,?,?,?,?)', list, callback);
    }
};
