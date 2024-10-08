import Row from 'react-bootstrap/Row';
import "../Styles/Spotify.css";
import { SpotifyUser } from '../SpotifyClass/fetchInformation';
import "../Styles/Font.css";
import TabbedContent from '../../Components/TabbedContent';
export default function Spotify() {
    //possibly delete this bc of renduncacny in tabbed content
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const user = new SpotifyUser(params.get("access_token"));

    return (
        <div className='spotifyContainer'>
            <div className="spotifyHeader koulen-regular">
                <h1>How are you feeling?</h1>
                <h2>Let's make a playlist for that!</h2>
            </div>
            <Row className='tabbedContent'>
                <TabbedContent user = {user}/>
            </Row>
        </div>
    )
}