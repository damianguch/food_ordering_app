const con = require('../db/connections')

const uploadProducts = async (product_name, product_code, category, description, price, image) => {
    var sql_create_record = `INSERT INTO products (product_name, product_code, category, description, price, image) VALUES (?, ?, ?, ?, ?, ?)`;
    con.query(sql_create_record, [product_name, product_code, category, description, price, image], function (err, result) {
      if (err) throw err;
  
    });
}

// check if product exists
const checkIfProductExists = async (product_code) => {
  return new Promise((resolve, reject) => {

    const query = `SELECT * FROM products WHERE product_code = ?`;
    con.query(query, [product_code], (error, results) => {
      if (error) {
        reject(error);
      } else {
        // Check if any product was found with the provided product_code
        if (results.length > 0) {
          // return true
          resolve(true);
        } else {
          // return false
          resolve(false);
        }
      }
    });
  });
};

// display products uploaded
async function displayUploadedProducts() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products LEFT JOIN categories ON categories.category_id=products.category ORDER BY product_id DESC`;
    con.query(query, [], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


// delete product
async function deleteProduct(productid) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM products WHERE product_id = ?`;
    con.query(query, [productid], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// change product status(in-stock/out of stock)
async function changeProductStatus(productstatus, productid) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE products SET in_stock = ? WHERE product_id = ?`;
    con.query(query, [productstatus, productid], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// edit product
async function editProduct(productid) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM products WHERE product_id = ?`;
    con.query(query, [productid], async (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// update product
const updateProducts = async (product_name, category, description, price, image, productid) => {
  var sql_create_record = `UPDATE products SET product_name = ?, category = ?, description = ?, price = ?, image = ? WHERE product_id = ?`;
  con.query(sql_create_record, [product_name, category, description, price, image, productid], function (err, result) {
    if (err) throw err;

  });
}

//save multiple images
const uploadProductsImages = async (product_id, left_view, right_view, back_view) => {
  var sql_create_record = `INSERT INTO product_images (product_id, left_view, right_view, back_view) VALUES (?, ?, ?, ?)`;
  con.query(sql_create_record, [product_id, left_view, right_view, back_view], function (err, result) {
    if (err) throw err;

  });
}

module.exports = {
  uploadProducts,
  checkIfProductExists,
  displayUploadedProducts,
  deleteProduct,
  editProduct,
  updateProducts,
  uploadProductsImages,
  changeProductStatus
}