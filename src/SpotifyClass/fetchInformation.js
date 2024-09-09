class SpotifyUser {

    constructor(access_token) {
        this.access_token = access_token;
        this.profileInformation = null; 
    }

    async profile(){
        const data = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${this.access_token}` }
        }).then((response) => response.json())
            .then((data) => data);
        return data;
    }

    async getFavorites(genre){
        return await fetch("https://api.spotify.com/v1/me/top/" + genre, {
            method: "GET", headers: { Authorization: `Bearer ${this.access_token}` }
        }).then((response) => response.json())
            .then((data) => data);
    }

    get dName() {
        return this.profileInformation;
    }

    set dName (data) {
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
export {getUserTest, SpotifyUser}

