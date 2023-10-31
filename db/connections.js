const mysql = require('mysql');

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "food_ordering_db"
});

module.exports = db