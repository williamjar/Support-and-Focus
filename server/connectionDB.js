// Jeg er klar over at det ikke er sikkert å lagre database-login slik.

let mysql = require("mysql");

let pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql-ait.stud.idi.ntnu.no",
    user: "williaj",
    password: "7PeatTdJ",
    database: "williaj",
    debug: false
});

module.exports = pool;
