const db = require('../db/connections')
const argon2 = require('argon2');
//const bcrypt = require('bcrypt');

// login logic
async function loginLogic(phone, password) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE phone = ?`;
      db.query(query, [phone], async (error, results) => {
        if (error) {
          reject(error);
        } else {
                if (results.length > 0) {
                  const hashedPasswordFromDB = results[0].password;
                  //const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);
                  const passwordMatch = await argon2.verify(hashedPasswordFromDB, password);
                  resolve(passwordMatch); // Resolves true if passwords match, otherwise resolves false
                } else {
                  resolve(false); // User not found, resolves false
              }
          }
      });
    });
}

// check if phone exists
const checkIfPhoneNumberExists = async (phone) => {
    return new Promise((resolve, reject) => {
  
      const query = `SELECT * FROM users WHERE phone = ?`;
      db.query(query, [phone], (error, results) => {
        if (error) {
          reject(error);
        } else {
          // Check if any user was found with the provided phone
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

// check users
async function checkUsers(phone) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE phone = ?`;
      db.query(query, [phone], async (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results); // Resolves true if passwords match, otherwise resolves false
        }
      });
    });
  }

  // get profile name
async function profileName(phone) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE phone = ?`;
      db.query(query, [phone], async (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results); // Resolves true if passwords match, otherwise resolves false
        }
      });
    });
  }
  
module.exports = {
    loginLogic,
    checkIfPhoneNumberExists,
    checkUsers,
    profileName,
}
