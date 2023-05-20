import { useState } from "react";
import "./Header.css"
import { Button, Input } from "@mui/material";
import { getUserTest, SpotifyUser } from "./fetchInformation";

function Header() {

    const [name, SetName] = useState("");

    async function getUser() {
        const urlParams = new URLSearchParams(document.location.search);
        const access_token = urlParams.get("access_token");
        fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${access_token}` }
        }).then((response) => response.json())
            .then((data) => SetName(data.display_name))
    }

    async function testGet() {
        const urlParams = new URLSearchParams(document.location.search);
        const access_token = urlParams.get("access_token");
        let spot = new SpotifyUser(access_token)
        await spot.init();
        console.log(spot.data)
    }


    

    return (
        <div id="title">
            Something here


            <div>
                <a href="http://localhost:8888/api/login">
                    <Button type="button">Post request</Button>
                </a>
                <Button type="button" onClick={getUser}>get profile</Button>
                <Button type = "button" onClick = {testGet}>Hi</Button>
            </div>
            {name}
        </div>
    )
}

export default Header