

const express = require('express');
const router = express.Router();

const fetch = require('node-fetch')

const querystring = require('querystring');
var SpotifyWebApi = require('spotify-web-api-node');
const REDIRECTURI = process.env.BASEURL + "/api/"


// this can be used as a seperate module
const encodeFormData = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

router.get('/', (req, res) => {
  const scope = "playlist-modify-public playlist-modify-private"
  const code = req.query.code;
  const body = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: req.protocol + '://' + req.get('host') + "/api",
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: scope
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
      const query = querystring.stringify(data);
      res.redirect(process.env.BASEURL + "?" + query)
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
      redirect_uri: req.protocol + '://' + req.get('host') + "/api"
    })
  );
});

router.get("/undefined", (req, res) => {
  res.redirect(process.env.BASEURL + "/api")
})

router.get("/wrapper", (req, res) => {
  const access_token = req.query.access_token;
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
    .then(data => {
      res.redirect(process.env.BASEURL + "/?" + data.json().toString());
    })
})

router.get("/addPlaylist", async (req, res) => {
  const searchParams = new URLSearchParams(req.query);
  let playlists = req.query.playlist;
  const input = req.query.input;
  const id = req.query.id;
  const access_token = req.query.access_token;

  playlists = playlists.split(",");

  if(!id) {
    res.redirect(process.env.BASEURL + "?" + "access_token="+access_token);
    return;
  }


  const playlistIDBody = {
    "name": input,
    "public": true,
    "collaborative": false,
    "description": input
  }
  console.log(playlistIDBody)

  const playlistId = await fetch("https://api.spotify.com/v1/users/" + id + "/playlists", {
    method: "POST", headers: { Authorization: `Bearer ${access_token}`}, body: JSON.stringify(playlistIDBody)
  })
    .then(response => response.json())
    .then(data => {console.log(data);return data["id"]})
    .catch(error => console.log(error))
  console.log(playlistId)
  
  const addPlaylistBody = {
    "playlist_id": playlistId,
    "position": 0,
    "uris": playlists
  }

  const result = await fetch("https://api.spotify.com/v1/playlists/" + playlistId + "/tracks", {
    method: "POST", headers: { Authorization: `Bearer ${access_token}` }, body: JSON.stringify(addPlaylistBody)
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));

  console.log(result)

  const queryItems = new URLSearchParams(); 
  queryItems.append("access_token", access_token);
  queryItems.append("playlist", playlistId);
  
  res.redirect(process.env.BASEURL + "?" + queryItems.toString());
  //im trying to be able to add tracks to a new playlist
  //current problem is saving user info

})
module.exports = router;