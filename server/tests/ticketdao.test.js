let mysql = require("mysql");

const ticketDao = require("./ticketdao.js");
let pool = require("./connectionDB")
const runsqlfile = require("./runsqlfile.js");

let ticketdao = new ticketDao(pool);

beforeAll(done => {
    runsqlfile("tests/sql/createTable.sql", pool, () => {
        runsqlfile("tests/sql/create_testdata.sql", pool, done);
        console.log("before all");
    });
});

afterAll(() => {
    pool.end();
});

beforeEach(() => {
    console.log("beforeEach");
});

afterEach(() => {
    console.log("afterEach");
});

test("get all tickets from db", done => {
    function callback(status, data) {
        console.log("Test callback: status=" + status + ", data.length=" + data.length);
        expect(data.length).toBeGreaterThan(0);
        done();
    }
    ticketDao.getAllTickets(callback);
});
