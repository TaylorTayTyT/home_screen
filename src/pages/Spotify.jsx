import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "../Styles/Spotify.css";
import { Button } from "@mui/material";
import { SpotifyUser } from '../SpotifyClass/fetchInformation';
import { useState } from 'react';
import SongEntry from '../../Components/SongEntry';

export default function Spotify() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const user = new SpotifyUser(params.get("access_token"));
    const [songs, SetSongs] = useState([]);
    if(songs) console.log(songs.map(item=> item))

    const getProfileInfo = async () => {
        let info = await user.profile();
        info.request_name = "profile";
        console.log(info);
    };
    
    const getFavorites = async () => {
        let info = await user.getFavorites();
        info.favorites = "favorites";
    }

    const generatePlaylist = async () => {
        /**
         * 1. Grab playlist based off keyword
         * 2. Collect Songs based off playlists bassed on songid (get max 50 songs from each playlist) and make sure all songs are unique
         * 3. Randomly select songs.
         * 4. List all the songs. 
         * 5. Give the option to save the playlist
         */
        const input = document.getElementById('playist_generator_form').value;
        if(!input) return alert("need an input")
        let info = await user.generate_random_playlist(input);
        SetSongs(info);
    }

    return (
        <div className='spotifyContainer'>
            <div className="spotifyHeader">
                <h1>How are you feeling?</h1>
                <h2>Let's make a playlist for that!</h2>
            </div>
            <Row>
                <Form.Group className='spotifyInputContainer'>
                    <Form.Control id='playist_generator_form' type="string" />
                </Form.Group>
            </Row>
            <Row>
                <a href={import.meta.env.VITE_DBURI}>
                    <Button type="button">Authenticate Spotify</Button>
                </a>
            </Row>
            <Row>
                <Button onClick={getProfileInfo}>Get Profile</Button>
                <Button onClick={getFavorites}>Get Favorited Songs</Button>
                <Button onClick={generatePlaylist}>Generate Playlist</Button>
            </Row>
            {songs.length > 0 ? songs.map(song => {
                return(
                    <>
                    <SongEntry title={song._name} author = {song._artists} imageURL={song._album_img.url}/>
                    </>
                )
                }) 
            : "loading"}
        </div>
    )
}