const express = require("express");
const cors = require("cors")
const app = express();
const path = require('path');
require("dotenv").config();

const servicesRoutes = require("./routes/servicesRoutes");
var corsOptions = {
  origin: 'http://localhost:3000'
};

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json())
app.use(cors())

// ROUTES
app.use("/api/", servicesRoutes)
// Serve images from the 'assets' folder
app.use('/assets/images/uploads', express.static(path.join(__dirname, 'assets/images/uploads')));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});