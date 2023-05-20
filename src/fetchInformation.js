class SpotifyUser {
    constructor(access_token) {
        this.access_token = access_token;
        this.data = null; 
    }

    async initialize(){
        console.log("hi")
        const data = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${this.access_token}` }
        }).then((response) => response.json())
            .then((data) => data);
        return data;
    }

    async init() {
        this.data = await this.initialize()
    }

    get member() {
        return this.data;
    }

    set member (data) {
        this.data = data; 
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

