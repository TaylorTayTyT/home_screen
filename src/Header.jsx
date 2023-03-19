import "./Header.css"
import { Button, Input } from "@mui/material"
import queryString from 'query-string'
import { useEffect } from "react"
import { Buffer } from "buffer"

function Header() {
    
    const redirect_uri = "http://localhost:3000/";

    function getCode(){
        let code = null;
        const queryString = window.location.search;
        if(queryString > 0){
            const urlParams = new URLSearchParams(queryString)
            code = urlParams.get("code");
        }
        return code;
    }

    function handleAuthorizationResponse(){
        console.log(this.status);
    }

    function callAuthorization(body){
        let xhr = new XMLHttpRequest();
        const auth = "de678a07418a4b96a8b492a1f0dbd108 : d2a338a35c894cfcba874f4f8fb21c09";
        xhr.open("POST", 'https://accounts.spotify.com/api/token', true);
        xhr.setRequestHeader("Content-Type", encodeURIComponent("application/x-www-form-urlencoded"));
        xhr.setRequestHeader("Authorization", "Basic " + encodeURIComponent(auth));
        xhr.send(body);
        xhr.onload = handleAuthorizationResponse();
    }

    function fetchAccessToken(code){
        let body = "grant_type=authorization_code";
        body += "&code=" + code;
        body += "&redirect_uri=http://localhost:3000/";
        body += "&client_id=de678a07418a4b96a8b492a1f0dbd108";
        body += "&client_secret=d2a338a35c894cfcba874f4f8fb21c09";
        callAuthorization(body);
    }

    useEffect(()=> {
        if(window.location.search.length > 0){
            const code = getCode();
            fetchAccessToken(code);
        }
    }, [])

    const submitAuthorization = (e) => {
        const scope = 'user-read-private user-read-email';
        const auth = "https://accounts.spotify.com/authorize?"
        const url = {
            "response_type": "code",
            "client_id": "de678a07418a4b96a8b492a1f0dbd108",
            "scope": scope,
            "redirect_uri": redirect_uri,
        }
        console.log(JSON.stringify(url))
        window.location.href = auth + "client_id=" + url.client_id + "&redirect_uri=" + url.redirect_uri +
        "&response_type=" + url.response_type + "&scope=" + url.scope + "&show_dialog=true"
    }

    const fetchFromBackend = () => {
        fetch("http://localhost:8888/api", {
            method: "get",
            mode: "cors",
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }

    const authorize = () => {
        fetch("http://localhost:8888/api", {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                dab: "supdude"
            }),
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return (
        <div id="title">
            Spotify Diversity Test
            <div>
                <Input id="client_id_field" type="text" placeholder="client_id">hi</Input>
                <Input id="client_secret_field" type="text" placeholder="client_secret">hi</Input>
                <Button type="submit" onClick={submitAuthorization}>Submit</Button>
                <Button type="button" onClick = {fetchFromBackend}>Testing</Button>
                <Button type="button" onClick = {authorize}>Post request</Button>
            </div>

        </div>
    )
}

export default Header