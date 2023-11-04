const mysql = require('mysql');

let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'food_ordering_db'
});

db.connect((err) => {
  if (err) {
    console.log('Database connection error', err);
  } else {
    console.log('Database connection successfull!');
  }
});

module.exports = db;
