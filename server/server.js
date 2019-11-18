
var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();
let errorMessage = "An error has occurred with the database.";
app.use(bodyParser.json());

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql-ait.stud.idi.ntnu.no",
    user: "williaj",
    password: "7PeatTdJ",
    database: "williaj",
    debug: false
});

function getTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    return dateTime;
}

// get all tickets
app.get("/tickets" , (req, res) => {
    console.log("GET: retrieves tickets");
    pool.getConnection((err, connection) => {
      console.log("Connected to database");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({
          error: "Feil ved oppkobling"
        });
      } else {
        connection.query(
          "SELECT * FROM ticket ORDER BY post_date DESC",
          (err, rows) => {
            connection.release();
            if (err) {
              console.log(err);
              res.json({
                error: "error queying"
              });
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  });

app.get("/archive", (req, res) => {
    console.log("GET: henter artikkelliste");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({
                error: "Feil ved oppkobling"
            });
        } else {
            connection.query(
                "SELECT * FROM archive ORDER BY post_date DESC",
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log("An error has occurred with the database.");
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

  // create ticket with post
app.post("/create_ticket", (req, res) => {
    console.log("Printer req " + req.body.headline);
    console.log("Printer res " + res);
  console.log("Fikk POST-Request fra klienten");
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Feil ved oppkobling");
      res.json("Feil ved oppkobling");
    } else {
      var val = [
        req.body.headline,
        req.body.content,
        req.body.priority,
        req.body.category,
        req.body.picture,
        getTime(),
        req.body.author
      ];
      console.log(req.body.author);
      connection.query(
        "INSERT INTO ticket(headline, content, priority, category, picture, post_date, author) VALUES (?,?,?,?,?,?,?)",
        val,
        err => {
          connection.release();
          if (err) {
            console.log(err);
            res.status(500);
            res.json({
              error: "Feil ved insert"
            });
          } else {
            console.log("insert ok");
            res.send("");
          }
        }
      );
    }
  });
});

 // publish a comment
app.post("/create_comment", (req, res) => {
  console.log("Fikk POST-Request fra klienten");
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Feil ved oppkobling");
      res.json("Feil ved oppkobling");
    } else {
      console.log("Oppkoblet mot databasekontakt");
      var val = [
        req.body.content,
        req.body.post_date,
        req.body.article_id
      ];
      connection.query(
        "INSERT INTO COMMENT(content,post_date,ticket_id) VALUES (?,?,?)",
        val,
        err => {
          connection.release();
          if (err) {
            console.log(errorMessage);
            res.status(500);
            res.json({
              error: "Feil ved insert"
            });
          } else {
            console.log("insert ok");
            res.send("");
          }
        }
      );
    }
  });
});

app.post("/archive_ticket", (req, res) => {
    console.log("Arkiverer ticket" + req.body.ticket_id);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json("Feil ved oppkobling");
        } else {
            console.log("Oppkoblet mot databasekontakt");
            var val = [
                req.body.ticket_id,
                req.body.headline,
                req.body.content,
                req.body.priority,
                req.body.category,
                req.body.picture,
                getTime(),
                req.body.author
            ];

            connection.query(
                "INSERT INTO archive(ticket_id, headline, content, priority, category, picture, post_date, author) VALUES (?,?,?,?,?,?,?,?)",
                val,
                err => {
                    connection.release();
                    if (err) {
                        console.log(errorMessage);
                        res.status(500);
                        res.json({
                            error: "Feil ved insert"
                        });
                    } else {
                        console.log("Inserted into database.");
                        res.send("");
                    }
                }
            );
        }
    });
});

app.delete("/delete_ticket", (req, res) => {
  console.log(req);
  pool.getConnection((err, connection) => {
    if(err) {
      console.log("Feil ved oppkobling");
      res.json("Feil ved oppkobling");
    } else{
      console.log("Oppkoblet mot databasekontakt" + req.body.ticket_id);
        var val = [req.body.ticket_id];

      connection.query(
        "DELETE FROM ticket WHERE ticket_id = ?", val,
        err => {
          connection.release();
          if(err) {
            console.log(errorMessage);
            res.status(500);
            res.json({
              error: "Feil ved sletting"
            });
          } else {
            console.log("Sletting ok"+ req.body.ticket_id);
            res.send(" ");
          }
        }
      );
    }
  });
});

let server = app.listen(4000);