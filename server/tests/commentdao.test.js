let mysql = require("mysql");

const CommentDao = require("../dao/commentdao.js");
let pool = require("./connectionDB");
const runsqlfile = require("./runsqlfile.js");

let commentDao = new CommentDao(pool);

afterAll(() => {
    pool.end();
});

test("get specific comment from db", done => {
    function callback(status, data) {
        console.log("Test callback: status=" + status + ", data.length=" + data.length);
        expect(data.length).toBeGreaterThanOrEqual(1);
        done();
    }
    commentDao.getComments(callback, 1);
});

test("get single latest ticket from db", done => {
    function callback(status, data) {
        console.log("Test callback: status=" + status + ", data.length=" + data.length);
        expect(status).toBe(200);
        done();
    }

    let list = ["Comment content", 1, "2000-01-01 00:00:00", 1];
    commentDao.postComment(callback, list);
});