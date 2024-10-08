const express = require('express');
const cors = require('cors');
const path = require("path");
require('dotenv').config({path: __dirname + "\\.env"});
const PORT = process.env.PORT || 8888;
const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true}));
application.use(cors({
  origin: "*",
}));

const AuthRoutes = require('./routes/AuthRoutes.js');
/** 
application.use("/", cors(), express.static("dist"), (req, res)=>{
  console.log(path.join(__dirname, "dist"));
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})
  */
// Serve static files from the "dist" directory
application.use(express.static(path.join(__dirname, '..', '..', 'dist')))

application.use('/api', cors(), AuthRoutes);

application.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});