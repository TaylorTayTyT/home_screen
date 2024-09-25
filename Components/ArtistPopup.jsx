import { useEffect, useState } from "react";
import "../src/Styles/ArtistPopup.css";
import "../src/Styles/Font.css";
import { CloseButton } from "react-bootstrap";

export default function ArtistPopup(props) {
    const [topTracks, SetTopTracks] = useState([]);
    const [relatedArtists, SetRelatedArtists] = useState(); 
    const closePopup = () => {
        SetTopTracks([]);
        props.SetPopup(null);
    };
    useEffect(()=>{
        if(!props.user || !props.popup) return;
        props.user.getArtistTopTracks(props.popup.id)
        .then(data=>{
            SetTopTracks(data);
        })
    }, [props.popup]);

    if(!props.popup) return; 
    return(
        <div className="popupContainer">
            <div className="artistHeader">
            <div className="popupHeader koulen-regular">{props.popup.name}</div>
            <div className="nanum-myeongjo-regular"><i>{props.popup.genres.join(", ")}</i></div>
            </div>
            <CloseButton onClick={closePopup} className="closeButton"/>

            <div className="popupHeader koulen-regular">
                Top Tracks
                <div className="topTracks">
                    {topTracks.tracks ? topTracks.tracks.map((track, idx) =>{
                        if(idx < 4) {
                            console.log(`url(${track.album.images[0].url})`)
                            console.log(track.album.images)
                            return(
                                <div className="track" style={{backgroundImage: track.album.images ? `url(${track.album.images[2].url})` : null}}> 
                                    {track.name}
                                </div>
                            )
                        }
                    }) : ""}
                </div>
            </div>

            <div className="popupHeader koulen-regular">
                Related Artists
            </div>
        </div>
    )
}