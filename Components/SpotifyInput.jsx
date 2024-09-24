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
    return (
        <div key={1}>
            <Form.Group className='spotifyInputContainer'>
                <Form.Control id='playist_generator_form' type="string" />
            </Form.Group>
            <Button onClick={() => { getPlaylists() }} className='submitInputButton' variant="primary">Submit</Button>
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