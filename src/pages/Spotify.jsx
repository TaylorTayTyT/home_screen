import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "../Styles/Spotify.css";
import { Button } from "@mui/material";
import { SpotifyUser } from '../SpotifyClass/fetchInformation';
import { useState } from 'react';

export default function Spotify() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const user = new SpotifyUser(params.get("code"));

    const getProfileInfo = async () => {
        const info = await user.profile();
        console.log(info);
    }

    return (
        <>
            <div class="spotifyHeader">
                <h1>How are you feeling?</h1>
                <h2>Let's make a playlist for that!</h2>
            </div>
            <Row>
                <Form.Group className='spotifyInputContainer'>
                    <Form.Control type="string"/>
                </Form.Group>
            </Row>
            <Row>
                <a href={import.meta.env.VITE_DBURI}>
                    <Button type="button">Authenticate Spotify</Button>
                </a>
            </Row>
            <Row>
                <Button onClick={getProfileInfo}>Get Profile</Button>
                <Button>Get Favorited Songs</Button>
            </Row>
        </>
    )
}