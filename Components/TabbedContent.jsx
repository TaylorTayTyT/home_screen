import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from "@mui/material";
import { SpotifyUser } from '../src/SpotifyClass/fetchInformation';
import SpotifyInput from './SpotifyInput';
import Profile from './Profile';
import { Form } from 'react-bootstrap';
export default function TabbedContent(props) {
    const [authenticated, SetAuthenticated] = useState(false);
    const [profile, SetProfile] = useState();
    const getProfile = async () => await props.user.profile();
    if (props.user) {
        props.user.checkIfValid()
            .then(async (valid) => {
                valid ? SetAuthenticated(true) : SetAuthenticated(false);
            });
    };
    useEffect(() => {
        if (authenticated) {
            document.querySelectorAll(".actionTab").forEach(actionTab => {
                actionTab.disabled = false;
            });
        }
        getProfile()
            .then(data => SetProfile(data))
    }, [])

    return (
        <Tabs
            defaultActiveKey="authenticate"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={currTab => console.log(currTab)}
        >
            <Tab eventKey="Authenticate" title="Authenticate">
                <a href={import.meta.env.VITE_DBURI}>
                    <Button type="button">Authenticate Spotify</Button>
                </a>
            </Tab>
            <Tab className='actionTab' eventKey="createPlaylist" title="Create Playlist" disabled={!authenticated}>
                    <SpotifyInput user={props.user} />
            </Tab>
            <Tab className='actionTab' eventKey="profile" title="Profile" disabled={!authenticated}>
                {profile ? <Profile profile = {profile}/> : ""}
            </Tab>
            <Tab className='actionTab' eventKey="contact" title="Contact" disabled={!authenticated}>
                Tab content for Contact
            </Tab>
        </Tabs>
    );
}