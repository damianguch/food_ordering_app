const jwt = require('jsonwebtoken');

const jwtSecretKey = process.env.ACCESS_SECRET_KEY; // Replace this with a strong secret key in production

// Function to generate a JWT token
function generateToken(payload) {
  return jwt.sign(payload, jwtSecretKey);
}

// Middleware function to verify JWT tokens
function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  let tokenArr = token.split(' ');
  //console.log(tokenArr[1]);
  jwt.verify(tokenArr[1], jwtSecretKey, (err) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    //req.user = decoded;
    next();
  });
}

module.exports = {
  generateToken,
  verifyToken
};
