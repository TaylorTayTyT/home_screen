//import { param } from "../backend/routes/AuthRoutes";

class SpotifyUser {

    constructor(access_token) {
        this.access_token = access_token;
        this.profileInformation = null;
    }

    async generate_random_playlist(input) {
        if (typeof input !== "string") throw ("Not a valid input");
        const params = new URLSearchParams({ "q": input, "type": "playlist" });
        const data = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.access_token}`
            }
        })
            .then(response => response.json())
            .then(listOfPlaylists => {
                let tracksPromisesArr = [];
                listOfPlaylists.playlists.items.forEach(playlist => {
                    let tracksPromises = fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${this.access_token}`
                        }
                    });
                    tracksPromisesArr.push(tracksPromises);
                });
                return Promise.allSettled(tracksPromisesArr)
                .then(response => {
                    let songIDs = new Set();
                    response.forEach(item => {
                        item.value.json()
                        .then(data => {
                            data.items.forEach(song => {
                                songIDs.add(song.track.id);
                            })
                        })
                    });
                    console.log(songIDs);
                })
                /**
                .then((values) =>{
                    console.log(values)
                    values.map(track => {
                        let trackSongIDs = [];
                        Array(track.items).forEach(trackItem =>{
                            trackSongIDs.push(trackItem.track.id);
                        });
                        return trackSongIDs;
                    })
                }); */
            })
        return data;

    }

    async profile() {
        const data = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${this.access_token}` }
        }).then((response) => response.json())
            .then((data) => data);
        return data;
    }

    async getFavorites(genre) {
        return await fetch("https://api.spotify.com/v1/me/top/" + genre, {
            method: "GET", headers: { Authorization: `Bearer ${this.access_token}` }
        }).then((response) => response.json())
            .then((data) => data);
    }

    get dName() {
        return this.profileInformation;
    }

    set dName(data) {
        this.data = data.profileInformation;
    }
}

async function getUserTest(url) {
    const urlParams = new URLSearchParams(url);
    const access_token = urlParams.get("access_token");
    let name = "";
    return await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${access_token}` }
    }).then((response) => response.json())
        .then((data) => data);
}
export { getUserTest, SpotifyUser }

