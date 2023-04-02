import "./Header.css"
import { Button, Input } from "@mui/material"
import queryString from 'query-string'
import { useEffect } from "react"
import { Buffer } from "buffer"

function Header() {


    const authorize = () => {
        fetch("http://localhost:8888/api/login", {
            method: "GET",

        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return (
        <div id="title">
            Spotify Diversity Test
            <div>
                <a href= "http://localhost:8888/api/login">
                <Button type="button">Post request</Button>
                </a>
            </div>

        </div>
    )
}

export default Header