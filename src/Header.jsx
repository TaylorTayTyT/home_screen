import "./Header.css"
import { Button, Input } from "@mui/material"
//import queryString from 'query-string'

function Header() {

    return (
        <div id="title">
            Spotify Diversity Test
            <div>
                <Input id="client_id_field" type="text" placeholder="client_id">hi</Input>
                <Input id="client_secret_field" type="text" placeholder="client_secret">hi</Input>
                <Button type="submit" >Submit</Button>
            </div>

        </div>
    )
}

export default Header