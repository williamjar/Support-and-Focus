const Dao = require("./dao.js");

module.exports = class Articledao extends Dao {
    getAllTickets(callback) {
        super.query("SELECT * FROM ticket", [], callback);
    }

}