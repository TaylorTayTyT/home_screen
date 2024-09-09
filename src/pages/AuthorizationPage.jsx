import { useState } from "react";
import "../Styles/AuthorizationPage.css";
import "../Styles/TimeFont.css";
import {SpotifyUser } from "../SpotifyClass/fetchInformation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import BookRecs from "./BookRecs";
import Gym from "./Gym";

import Spotify from "./Spotify";

function AuthorizationPage() {
    
    const [dateHour, SetDateHour] = useState(new Date().getHours());
    const [dateMin, SetDateMin] = useState(new Date().getMinutes());
    const [name, SetName] = useState("");
    setInterval(() => {
        SetDateHour(new Date().getHours());
        SetDateMin(new Date().getMinutes());
    }, 1000
    );

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

    return (
        <div className="layout_container">
            {/*left_side*/}
            <Container>
                <Row id="time" className="gadget nanum-myeongjo-extrabold">
                    {`${dateHour}:${dateMin}`}
                </Row>
                <Row className="gadget">
                    <BookRecs/>
                </Row>
                <Row className="gadget">
                    <Gym/>
                </Row>
            </Container>
            {/*right_side*/}
            <Container className="Spotify_container">
                <Spotify />
            </Container>
        </div>
    )
}

export default AuthorizationPage