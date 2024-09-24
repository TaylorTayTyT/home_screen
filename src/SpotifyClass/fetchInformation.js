//import { param } from "../backend/routes/AuthRoutes";
import Song from "./Song";

class SpotifyUser {

    constructor(access_token) {
        this.access_token = access_token;
        this.profileInformation = null;
    }

    async retrieve_songs(songIDs) {
        const songsPromise = new Promise((resolve, reject) => {
            let songs = [];
            songIDs.forEach(songID => {
                fetch(`https://api.spotify.com/v1/tracks/${songID}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${this.access_token}`
                    }
                })
                    .then(res => res.json())
                    .then(song => {
                        songs.push(new Song(song));
                    })
                    .catch(e => console.log(e))
            });

            Promise.all(songs)
                .then(results => resolve(songs))
                .catch(err => reject(err))
        });
        const songsArrJSON = await songsPromise;
        return songsArrJSON;

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
            .then(async listOfPlaylists => {
                const playlistPromise = new Promise((resolve, reject) => {
                    let tracksPromisesArr = [];

                    listOfPlaylists.playlists.items.forEach(playlist => {
                        // Push the fetch promise into tracksPromisesArr
                        let trackPromise = fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${this.access_token}`
                            }
                        }).then(response => response.json()); // Return the fetch promise

                        tracksPromisesArr.push(trackPromise); // Push the promise into the array
                    });

                    // Use Promise.all to wait for all fetch promises to complete
                    Promise.all(tracksPromisesArr)
                        .then(results => resolve(results)) // Resolve with all the results
                        .catch(error => reject(error)); // Reject if any fetch fails
                });
                const res = await playlistPromise;
                let songIDs = new Set();
                res.forEach((playlist) => {
                    playlist.items.forEach((song) => {
                        if (song.track) songIDs.add(song.track.id)
                    });
                });

                // Retrieve up to 50 unique song IDs
                let playlistSongIDs = [];
                let setIter = songIDs.values(); // Use .values() instead of .entries()
                let currSong = setIter.next().value;
                let counter = 0;

                while (counter < 50 && currSong) {
                    playlistSongIDs.push(currSong);
                    currSong = setIter.next().value;
                    counter += 1;
                }
                return playlistSongIDs;
            })
            .catch(e => console.log(e));
        if (data) return this.retrieve_songs(data);
        return null;

    }

    async checkIfValid() {
        return this.profile()
            .then((data) => {
                if(data.error) return false;
                return true;
            })
            .catch((error) => {
                return false;
            })
    }

    async profile() {

        const data = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${this.access_token}` }
        }).then((response) => response.json())
            .then((data) => data)
            .catch(e => { return null; 
            });
        if(data.error) return null;
        return data;
    }

    async getFavorites(genre) {
        return await fetch("https://api.spotify.com/v1/me/top/" + genre, {
            method: "GET", headers: { Authorization: `Bearer ${this.access_token}` }
        }).then((response) => response.json())
            .then((data) => data);
    }

    async topItems(){
        const topItems = await fetch("https://api.spotify.com/v1/me/top/artists", {
            method: "GET", headers: { Authorization: `Bearer ${this.access_token}` }
        }).then((response) => response.json())
        .then((data) => data)
        .catch(e => {return null;} 
        );
        if(topItems.error) return null; 
        return topItems;
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

