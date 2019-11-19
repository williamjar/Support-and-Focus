const Dao = require("./dao.js");

module.exports = class Articledao extends Dao {
    getAllTickets(callback) {
        super.query("select article_id, headline, content, priority, picture, post_date, category, author from article where visible=1 limit 20", [], callback);
    }

}