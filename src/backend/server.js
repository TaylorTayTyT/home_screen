const express = require('express');
const cors = require('cors');
const path = require("path");
require('dotenv').config({path: __dirname + "\\.env"});
console.log(process.env.CLIENT_ID);
const PORT = process.env.PORT || 8888;
const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true}));
application.use(cors({
  origin: "*",
}));

const AuthRoutes = require('./routes/AuthRoutes.js');
application.use('/api', cors(), AuthRoutes);
application.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});