let mysql = require("mysql");

const TicketDao = require("../dao/ticketdao.js");
let pool = require("./connectionDB");
const runsqlfile = require("./runsqlfile.js");

let ticketDao = new TicketDao(pool);

afterAll(() => {
    pool.end();
});

test("get all tickets from db", done => {
    function callback(status, data) {
        console.log("Test callback: status=" + status + ", data.length=" + data.length);
        expect(data.length).toBeGreaterThan(0);
        done();
    }
    ticketDao.getAll(callback);
});

test("get single latest ticket from db", done => {
    function callback(status, data) {
        console.log("Test callback: status=" + status + ", data.length=" + data.length);
        expect(data.length).toBe(1);
        done();
    }
    ticketDao.getLatest(callback);
});

test("post ticket to db", done =>{
    function callback(status, data){
        console.log("Test callback: status=" + status + ", data.length="+data.length);
        expect(status).toBe(200);
        done()
    }
    let list = ["Sample ticket","I need help with my sample ticket",2,"picture.png","2000-01-01 00:00:00","test@test.no",1,"Navn Navnesen"];

    ticketDao.createOne(callback, list);
});

test("update ticket db", done =>{
    function callback(status, data){
        console.log("Test callback: status=" + status + ", data.length="+data.length);
        expect(status).toBe(200);
        done()
    }
    let list = ["Updated headline", "Updated content", 1, "updatedPicture.png","updated@email.com",2,1];
    ticketDao.updateOne(callback, list);
});

test("solve a ticket", done =>{
    function callback(status, data){
        console.log("Test callback: status=" + status + ", data.length="+data.length);
        expect(status).toBe(200);
        done()
    }
    ticketDao.solveOne(callback,1);
});

test("get tickets by priority from db", done =>{
    function callback(status, data){
        console.log("Test callback: status=" + status + ", data.length="+data.length);
        expect(data.length).toBeGreaterThan(0);
        done()
    }
    ticketDao.getByPriority(callback, 2);
});

test("get tickets by group from db", done =>{
    function callback(status, data){
        console.log("Test callback: status=" + status + ", data.length="+data.length);
        expect(data.length).toBeGreaterThanOrEqual(0);
        done()
    }
    ticketDao.getByGroup(callback, 1);
});