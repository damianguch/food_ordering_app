//const bcrypt = require('bcrypt');
const argon2 = require('argon2');

//const saltRounds = 10;

async function encryptPasswordWithBcrypt(plaintextPassword) {
  // const hashedPassword = await bcrypt.hash(password, saltRounds);
  (async () => {
    try {
      const hashedPassword = await argon2.hash(plaintextPassword);
      // Store the 'hashedPassword' in your database
      //console.log('Hashed Password:', hashedPassword);
      return hashedPassword;
    } catch (err) {
      // Handle error
    }
  })();
}

module.exports = {encryptPasswordWithBcrypt};