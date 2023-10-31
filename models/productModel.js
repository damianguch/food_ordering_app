const con = require('../db/connections')

// fetch all Categories
async function fetchAllCategories() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM categories ORDER BY category_id ASC`;
      con.query(query, [], async (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
}

// fetch all products
async function fetchAllProducts() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products LEFT JOIN categories ON categories.category_id=products.category ORDER BY category_id ASC`;
    con.query(query, [], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// fetch all producs by category
async function fetchAllProductByCategory(category) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products LEFT JOIN categories ON categories.category_id=products.category WHERE products.category = ? ORDER BY category_id ASC`;
    con.query(query, [category], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// fetch all luxury  hairs
async function fetchAllLuxuryhair() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products LEFT JOIN categories ON categories.category_id=products.category WHERE products.category = 3 ORDER BY category_id ASC`;
    con.query(query, [], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// fetch all human  hairs
async function fetchAllHumanhair() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products LEFT JOIN categories ON categories.category_id=products.category WHERE products.category = 1 ORDER BY category_id ASC`;
    con.query(query, [], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// fetch all human hairs blend
async function fetchAllHumanhairBlend() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products LEFT JOIN categories ON categories.category_id=products.category WHERE products.category = 2 ORDER BY category_id ASC`;
    con.query(query, [], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// fetch all braids
async function fetchAllBraids() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products LEFT JOIN categories ON categories.category_id=products.category WHERE products.category = 4 ORDER BY category_id ASC`;
    con.query(query, [], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// fetch all accessories
async function fetchAllAccessories() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products LEFT JOIN categories ON categories.category_id=products.category WHERE products.category = 5 ORDER BY category_id ASC`;
    con.query(query, [], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// fetch all producs by category
async function fetchAllProductById(productid) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products LEFT JOIN categories ON categories.category_id=products.category WHERE products.product_id = ? ORDER BY category_id ASC`;
    con.query(query, [productid], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// add to cart
const addCart = async (cart_unique_code, product_id, product_code, product_name, price, image) => {
  var sql_create_record = `INSERT INTO carts (cart_unique_code, product_id, product_code, product_name, price, image) VALUES (?, ?, ?, ?, ?, ?)`;
  con.query(sql_create_record, [cart_unique_code, product_id, product_code, product_name, price, image], function (err, result) {
    if (err) throw err;

  });
}

// fetch cart details
async function fetchCartInformation(uniqueid) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM carts WHERE cart_unique_code = ? ORDER BY cart_id ASC`;
    con.query(query, [uniqueid], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// remove item from cart
async function removeItemById(cartid) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM carts WHERE cart_id = ?`;
    con.query(query, [cartid], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// remove all user cart items
async function deleteCartItemsByUniqueCode(cart_unique_code) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM carts WHERE cart_unique_code = ?`;
    con.query(query, [cart_unique_code], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// fetch all customer orders
async function fetchCustomerOrder() {
  return new Promise((resolve, reject) => {
    const query = `SELECT *, orders.created_at AS OrderDate FROM orders LEFT JOIN users ON users.id = orders.user_id ORDER BY order_id DESC`;
    con.query(query, [], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// confirm delivery
async function confirmDelivery(orderid) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE orders SET delivery_status = 1 WHERE order_id = ?`;
    con.query(query, [orderid], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// fetch all my orders
async function fetchMyOrder(userid) {
  return new Promise((resolve, reject) => {
    const query = `SELECT *, orders.created_at AS OrderDate FROM orders LEFT JOIN users ON users.id=orders.user_id WHERE orders.user_id=? ORDER BY order_id DESC`;
    con.query(query, [userid], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


module.exports = {
    fetchAllCategories,
    fetchAllProducts,
    fetchAllLuxuryhair,
    fetchAllHumanhair,
    fetchAllHumanhairBlend,
    fetchAllBraids,
    fetchAllAccessories,
    fetchAllProductByCategory,
    fetchAllProductById,
    addCart,
    fetchCartInformation,
    removeItemById,
    deleteCartItemsByUniqueCode,
    fetchCustomerOrder,
    confirmDelivery,
    fetchMyOrder
}