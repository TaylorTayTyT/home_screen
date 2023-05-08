import "./Header.css"
import { Button, Input } from "@mui/material"

function Header() {
    const getHashParams = () => {
        const hashParams = {};
        let e,
            r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.search.substring(1);

        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }

        return hashParams;
    }

    /*

    console.log(getHashParams().code)

    const accessToken = getHashParams().code;

    const url = 'https://api.spotify.com/v1/me/top/artists';
    const headers = {
        Authorization: 'Bearer ' + accessToken
    }

    fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        });

        */

    return (
        <div id="title">
            Spotify Diversity Test
            <div>
                <a href="http://localhost:8888/api/login">
                    <Button type="button">Post request</Button>
                </a>
            </div>
        </div>
    )
}

export default Header