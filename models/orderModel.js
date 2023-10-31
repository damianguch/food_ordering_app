const con = require('../db/connections')

const orders = async (user_id, product_id, product_code, product_name, qty, price, image) => {
  var sql_create_record = `INSERT INTO orders (user_id, product_id, product_code, product_name, qty, price, image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  con.query(sql_create_record, [user_id, product_id, product_code, product_name, qty, price, image], function (err, result) {
    if (err) throw err;

  });
}

module.exports = {
  orders
}