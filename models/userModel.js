const con = require('../db/connections')

const createAccount = async (firstname, lastname, phone, delivery_address, password, role) => {
    var sql_create_record = `INSERT INTO users (firstname, lastname, phone, address, password, roles) VALUES (?, ?, ?, ?, ?, ?)`;
    con.query(sql_create_record, [firstname, lastname, phone, delivery_address, password, role], function (err, result) {
      if (err) throw err;
  
    });
}

module.exports = {
    createAccount,
}