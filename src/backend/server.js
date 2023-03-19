
/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var cors = require('cors');
require('dotenv').config();
//var proxy = require('http-proxy-middleware')

var cors = require("cors")
var app = express();
var bodyParser = require('body-parser');

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}))

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api', cors(), (req, res, next) => {
  console.log("hi")
  res.send({ message: "Hello from server!" });
})

app.post('/api', cors(), (req, res, next) => {
  console.log(req.body);
  res.json({ message: "hello from anyone" })
})

app.listen(8888, () => {
  console.log("listening to port 8888")
})
