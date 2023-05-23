import { useState } from "react";
import "./AuthorizationPage.css"
import { Button, Input } from "@mui/material";
import { getUserTest, SpotifyUser } from "../SpotifyClass/fetchInformation";

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

    return (
        <div id="title">
            Spotify Info
            <div>
                <a href="http://localhost:8888/api/login">
                    <Button type="button">Post request</Button>
                </a>
            </div>
            {name}
        </div>
    )
}

export default AuthorizationPage