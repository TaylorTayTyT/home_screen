import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from "@mui/material";
import { SpotifyUser } from '../SpotifyClass/fetchInformation';

export default function TabbedContent() {
    const [user, SetUser] = useState(null)
    const [authenticated, SetAuthenticated] = useState(false);

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const access_token = params.get("access_token");
    if (access_token) {
        const testUser = new SpotifyUser(access_token);
        testUser.checkIfValid()
            .then(valid => valid ? SetAuthenticated(true) : SetAuthenticated(false));
    };


    useEffect(() => {
        if (authenticated) {
            document.querySelectorAll(".actionTab").forEach(actionTab => {
                console.log(actionTab)
                actionTab.disabled = false;
            })
        }
    }, [])


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
            <Tab className='actionTab' eventKey="home" title="Home" disabled = {!authenticated}>
                home
            </Tab>
            <Tab className='actionTab' eventKey="profile" title="Profile" disabled = {!authenticated}>
                Tab content for Profile
            </Tab>
            <Tab className='actionTab' eventKey="contact" title="Contact" disabled = {!authenticated}>
                Tab content for Contact
            </Tab>
        </Tabs>
    );
}