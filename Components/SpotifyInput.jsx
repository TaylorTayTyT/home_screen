import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import "../src/Styles/SpotifyInput.css";
import { useState } from 'react';
import SongEntry from './SongEntry';
import Loading from './Loading';
export default function SpotifyInput(props) {
    const [clickedSubmit, SetClickedSubmit] = useState(false);
    const [songs, SetSongs] = useState([]);
    let retrievedPlaylist = null;
    console.log(props.user._id)
    const getPlaylists = async () => {
        const input = document.getElementById('playist_generator_form').value;
        if (!input) alert("You must have a search input");
        console.log(songs)

        retrievedPlaylist = await props.user.generate_random_playlist(input);
        if (retrievedPlaylist) {
            SetSongs(retrievedPlaylist);
            SetClickedSubmit(true);
        }
        else {
            alert("something went wrong");
        }
    };
    const addToPlaylist = async () => {
        const queryItems = new URLSearchParams();
        const input = document.getElementById('playist_generator_form').value;
        queryItems.append("playlist", songs.map(song => song._uri).toString());
        queryItems.append("id", props.user._id);
        console.log(props.user._id)
        queryItems.append("input", input);
        queryItems.append("access_token", props.user.access_token);
        console.log(queryItems.toString())
        window.location.href = import.meta.env.VITE_DBURI_AUTH + "/addPlaylist?q=URLUtils.searchParams&" + queryItems.toString();
    }
    console.log(songs)
    return (
        <div key={1}>
            <Form.Group className='spotifyInputContainer'>
                <Form.Control id='playist_generator_form' type="string" />
            </Form.Group>
            <div>
            <Button onClick={() => { getPlaylists() }} className='submitInputButton' variant="primary">Submit</Button>
            {songs.length > 0 ? <Button onClick={addToPlaylist}>Add To Playlist</Button> : ""}
            </div>
            {songs.length > 0 ? songs.map(song => {
                return (
                    <div>
                        <SongEntry preview_url = {song._preview_url} key={song._id} title={song._name} author={song._artists} imageURL={song._album_img.url} />
                    </div>
                )
            })
                : clickedSubmit ? <Loading /> : ""}
        </div>
    )
}