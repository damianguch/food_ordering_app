const mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", //nia4ijl64ltg // GHTwx9sRVjFR
    database: "food_db"
});

module.exports = con