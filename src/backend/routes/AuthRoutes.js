

const express = require('express');
const router = express.Router();

const fetch = require('node-fetch')

const querystring = require('querystring');
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECTURI
})

// this can be used as a seperate module
const encodeFormData = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

router.get('/', (req, res) => {
  console.log(req.query);
  const code = req.query.code;
  const body = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: process.env.REDIRECTURI,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  }

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    body: encodeFormData(body)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const query = querystring.stringify(data);
    res.redirect(process.env.BASEURL + "/api/wrapper?" + query)
  });

  
})

router.get('/login', async (req, res) => {
  const scope =
    `user-modify-playback-state
    user-read-playback-state
    user-read-currently-playing
    user-library-modify
    user-library-read
    user-top-read
    playlist-read-private
    playlist-modify-public`;

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.REDIRECTURI
    })
  );
});

router.get("/undefined", (req, res) => {
  res.redirect(process.env.BASEURL + "/api")
})

router.get("/wrapper", (req, res) => {
  const access_token = req.query.access_token;
  spotifyApi.setAccessToken(access_token);
  res.redirect(process.env.BASEURL + "/?access_token=" + access_token)
});

router.get("/profile", (req, res) => {
  const access_token = req.query.access_token;
  fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      "Authorization": access_token
    }
  })
  .then(res => {
    res.json(); 
  })
  .then(data =>{
    res.redirect(process.env.BASEURL + "/?"+ data.json().toString());
  })
})
module.exports = router;