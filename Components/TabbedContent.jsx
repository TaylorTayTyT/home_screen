import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from "@mui/material";
import SpotifyInput from './SpotifyInput';
import Profile from './Profile';
import { Form } from 'react-bootstrap';
export default function TabbedContent(props) {
    const [authenticated, SetAuthenticated] = useState(false);
    const [profile, SetProfile] = useState();
    useEffect(() => {
        if (props.user) {
            props.user.checkIfValid()
                .then(async (valid) => {
                    valid ? SetAuthenticated(true) : SetAuthenticated(false);
                })
                .catch(e => console.log(e))
        };
    }, [])
    useEffect(() => {
        if (authenticated) {
            document.querySelectorAll(".actionTab").forEach(actionTab => {
                actionTab.disabled = false;
            });
            props.user.profile()
                .then(data => {
                    SetProfile(data);
                })

                .catch(e => console.log(e))
        }
    }, [authenticated])

    return (
        <Tabs
            defaultActiveKey="authenticate"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="Authenticate" title="Authenticate">
                <a href={import.meta.env.VITE_DBURI}>
                    <Button type="button">Authenticate Spotify</Button>
                </a>
            </Tab>
            <Tab className='actionTab' eventKey="createPlaylist" title="Create Playlist" disabled={!authenticated}>
                <Form>
                    <SpotifyInput user={props.user} />
                </Form>
            </Tab>
            <Tab className='actionTab' eventKey="profile" title="Profile" disabled={!authenticated}>
                <Profile user={props.user} />
            </Tab>
        </Tabs>
    );
}