import "./Header.css"
import { Button, Input } from "@mui/material"
import queryString from 'query-string'

function Header() {
    const submitAuthorization = (e) => {
        const client_id = document.getElementById("client_id_field").value
        const client_secret = document.getElementById("client_secret_field").value
        const scope = 'user-read-private user-read-email';
        const url = {
            "response_type": "code",
        }
        console.log(url)
    }

    return (
        <div id="title">
            Spotify Diversity Test
            <div>
                <Input id="client_id_field" type="text" placeholder="client_id">hi</Input>
                <Input id="client_secret_field" type="text" placeholder="client_secret">hi</Input>
                <Button type="submit" onClick={submitAuthorization}>Submit</Button>
            </div>

        </div>
    )
}

export default Header