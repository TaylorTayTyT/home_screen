import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import "../src/Styles/SpotifyInput.css";
import { useEffect, useState } from 'react';
import SongEntry from './SongEntry';
import Loading from './Loading';
export default function SpotifyInput(props) {
    const [clickedSubmit, SetClickedSubmit] = useState(false);
    const [songs, SetSongs] = useState([])
    const [checkMadeSongs, SetCheckMadeSongs] = useState(false);
    const [id, SetId] = useState();

    const checkJustMadeSongs = () =>{
        const params = new URLSearchParams(window.location.href);
        if(!params.has("playlist")) return null; 
        const playlist = params.get("playlist").split(",");
        SetCheckMadeSongs(true);
    }
    let retrievedPlaylist = null;
    const getPlaylists = async () => {
        const input = document.getElementById('playist_generator_form').value;
        if (!input) alert("You must have a search input");

        retrievedPlaylist = await props.user.generate_random_playlist(input);
        if (retrievedPlaylist) {
            SetSongs(retrievedPlaylist);
            SetClickedSubmit(true);
        }
    };
    const addToPlaylist = async () => {
        const queryItems = new URLSearchParams();
        const input = document.getElementById('playist_generator_form').value;
        queryItems.append("playlist", songs.map(song => song._uri).toString());
        queryItems.append("id", props.user._id);
        queryItems.append("input", input);
        queryItems.append("access_token", props.user.access_token);
        window.location.href = import.meta.env.VITE_DBURI_AUTH + "/addPlaylist?q=URLUtils.searchParams&" + queryItems.toString();
    }
    useEffect(()=>{
        props.user.profile()
        .then(data => SetId(data["id"]))

        window.addEventListener("keypress", (e) =>{
            if(e.key === "Enter") {
                e.preventDefault(); 
                return; 
            }
        })

        checkJustMadeSongs(); 
    });
    console.log(songs)
    return (
        <div key={1}>
            {checkJustMadeSongs ? (<div>
                Check out the <a href={"spotify:playlist:" + new URLSearchParams(window.location.href).get("playlist")}>playlist</a> you just made!
            </div>) 
            : ""}
            <Form.Group className='spotifyInputContainer'>
                <Form.Control id='playist_generator_form' type="string" />
            </Form.Group>
            <div className='spotifyControllers'>
                <Button onClick={() => { getPlaylists() }} variant="outline-primary" className='submitInputButton' >Submit</Button>
                {songs.length > 0 ? <Button onClick={addToPlaylist} variant="outline-primary">Add To Playlist</Button> : ""}
            </div>
            {songs.length > 0 ? songs.map(song => {
                return (
                    <div>
                        <SongEntry preview_url={song._preview_url} key={song._id} title={song._name} author={song._artists} imageURL={song._album_img.url ? song._album_img.url : null} />
                    </div>
                )
            })
                : clickedSubmit ? <Loading /> : ""}
        </div>
    )
}