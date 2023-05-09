import "./Header.css"
import { Button, Input } from "@mui/material"

function Header() {

    async function getUser(token) {

        const urlParams = new URLSearchParams(document.location.search);
        const access_token = urlParams.get("access_token");
        console.log("access token is: " + urlParams.get("access_token"));
        fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${access_token}` }
        }).then((response) => response.json())
            .then((data) => console.log(data))
    }
    return (
        <div id="title">
            Spotify Diversity Test
            <div>
                <a href="http://localhost:8888/api/login">
                    <Button type="button">Post request</Button>
                </a>
                <Button type="button" onClick={getUser}>get profile</Button>
            </div>
        </div>
    )
}

export default Header