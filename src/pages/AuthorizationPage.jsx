import { useState } from "react";
import "../Styles/AuthorizationPage.css"
import { Button, Input } from "@mui/material";
import { getUserTest, SpotifyUser } from "../SpotifyClass/fetchInformation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function AuthorizationPage() {

    const [name, SetName] = useState("");

    async function getUser() {
        const urlParams = new URLSearchParams(document.location.search);
        const access_token = urlParams.get("access_token");
        fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${access_token}` }
        }).then((response) => response.json())
            .then((data) => SetName(data.display_name))
    }

    async function getTopArtists() {
        const urlParams = new URLSearchParams(document.location.search);
        const access_token = urlParams.get("access_token");
        let spot = new SpotifyUser(access_token)
        console.log(await spot.profile())
    }

    /**
     * <a href="http://localhost:8800/api/login">
                        <Button type="button">Post request</Button>
                    </a>
     */

    return (
        <div className="layout_container">
            {/*left_side*/}
            <Container>
                <Row className="gadget">
                    time
                </Row>
                <Row className="gadget">
                    goodreads
                </Row>
                <Row className="gadget">
                    gym
                </Row>
            </Container>
            {/*right_side*/}
            <Container>
                <Row className="">
                    <Form.Group>
                    <Form.Control type="string"/>
                    </Form.Group>
                    </Row>
                    <Row>
                    <Form.Text muted>
                        Your password must be 8-20 characters long, contain letters and numbers,
                        and must not contain spaces, special characters, or emoji.
                    </Form.Text>
                    </Row>
                    <Row>
                        <a href={import.meta.env.VITE_DBURI}>
                            <Button type="button">Authenticate Spotify</Button>
                        </a>
                    </Row>
                
            </Container>
        </div>
    )
}

export default AuthorizationPage