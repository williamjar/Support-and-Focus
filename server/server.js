// @flow
let express = require("express");

let bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.json()); // for å tolke JSON
let cors = require("cors");
app.use(cors());
let pool = require("./connectionDB");


function getTime() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    return dateTime;
}

const TicketDao = require('./dao/ticketdao.js');
const CommentDao = require('./dao/commentdao.js');
const GroupDao = require('./dao/groupdao.js');

let ticketdao = new TicketDao(pool);
let commentdao = new CommentDao(pool);
let groupdao = new GroupDao(pool);

app.get("/tickets/", (req, res) => {
    console.log("Fikk request om alle artikler");
    ticketdao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/tickets/priority/:priority", (req, res) => {
    console.log("Fikk request om artikler basert på prioritet");
    ticketdao.getByPriority((status, data) => {
        res.status(status);
        res.json(data);
    }, req.params.priority);
});

app.get("/comments/ticket_id/:ticket_id", (req, res) => {
    commentdao.getComments((status, data) => {
        res.status(status);
        res.json(data);
    }, req.params.ticket_id);
});

app.get("/groups", (req, res) => {
    groupdao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.put("/tickets", (req, res) => {
    let val = [
        req.body.headline,
        req.body.content,
        req.body.priority,
        req.body.picture,
        req.body.email,
        req.body.group_id,
        req.body.author,
        req.body.ticket_id
    ];
    ticketdao.updateOne((status, data) => {
        res.status(status);
        res.json(data);
    }, val);
});


app.post("/create_ticket", (req, res) => {
    let val = [
        req.body.headline,
        req.body.content,
        req.body.priority,
        req.body.picture,
        getTime(),
        req.body.email,
        req.body.group_id,
        req.body.author
    ];

    ticketdao.createOne((status, data) => {
        res.status(status);
        res.json(data);
    }, val);

});


app.post("/create_comment", (req, res) => {
    let val = [
        req.body.content,
        req.body.priority,
        getTime(),
        req.body.ticket_id
    ];
    commentdao.postComment((status, data) => {
        res.status(status);
        res.json(data);
    }, val);
});


let server = app.listen(4000);