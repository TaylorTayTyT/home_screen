class Song {
    constructor(SpotifyJSONObject){
        this._name = SpotifyJSONObject.name; 
        this._id = SpotifyJSONObject.id; 
        this._artists = SpotifyJSONObject.artists; //have to destructure this
        this._album_img = SpotifyJSONObject.album.images[0];
        this._preview_url = SpotifyJSONObject.preview_url; 
        this._uri = SpotifyJSONObject.uri; 
    }
    get preview_url(){
        return this._preview_url;
    }
    get name() {
        return this._name; 
    };
    get id() {
        return this._id; 
    }
    get artists(){
        const artist_arr = this._artists.map(artist => {
            return artist.name; 
        })
        return artist_arr;
    }
    get album_img(){
        return this._album_img; 
    }
    get uri(){
        return this._uri; 
    }
}

export default Song; 