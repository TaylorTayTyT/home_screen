import { useEffect, useState } from "react";
import "../src/Styles/ArtistPopup.css";
import "../src/Styles/Font.css";
import { CloseButton } from "react-bootstrap";
import { Carousel } from "react-bootstrap";

export default function ArtistPopup(props) {
    const [topTracks, SetTopTracks] = useState([]);
    const [relatedArtists, SetRelatedArtists] = useState([]);
    const trackLink = (track) => {
        window.open(track.uri);
    };
    const artistLink = (artist) => {
        window.open(artist.uri);
    }
    const closePopup = () => {
        SetTopTracks([]);
        props.SetPopup(null);
    };
    useEffect(() => {
        if (!props.user || !props.popup) return;
        props.user.getArtistTopTracks(props.popup.id)
            .then(data => {
                SetTopTracks(data);
            });
        props.user.getArtistRelatedArtists(props.popup.id)
            .then(data => {
                SetRelatedArtists(data);
            });
        document.querySelectorAll(".carousel-indicators").forEach(item=>{
            item.style.marginBottom = 0; 
        });
        document.querySelectorAll("carousel-control-prev").forEach(item=>{
            item.style.opacity = 1; 
        });
        document.querySelectorAll("carousel-control-next").forEach(item=>{
            item.style.opacity = 1; 
        });
    }, [props.popup]);

    if (!props.popup) return;
    return (
        <div className="popupContainer">
            <div className="artistHeader">
                <div className="popupHeader koulen-regular">{props.popup.name}</div>
                <div className="nanum-myeongjo-regular"><i>{props.popup.genres.join(", ")}</i></div>
            </div>
            <CloseButton onClick={closePopup} className="closeButton" />

            <div className="popupHeader koulen-regular">
                Top Tracks
                <Carousel controls={true} variant="dark">
                    <Carousel.Item>
                            <div className="topTracks">
                                {topTracks.tracks ? topTracks.tracks.map((track, idx) => {
                                    if (idx < 4) {
                                        return (
                                            <div onClick={() => trackLink(track)} className="track" style={{ backgroundImage: track.album.images ? `url(${track.album.images[2].url})` : null }}>
                                                {track.name}
                                            </div>
                                        )
                                    }
                                }) : ""}
                            </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div>
                            hi
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="popupHeader koulen-regular">
                Related Artists
                <div className="topTracks">
                    {relatedArtists.artists ? relatedArtists.artists.map((artist, idx) => {
                        if (idx < 4) {
                            return (
                                <div onClick={() => artistLink(artist)} className="track" style={{ backgroundImage: artist.images ? `url(${artist.images[2].url})` : null }}>
                                    {artist.name}
                                </div>
                            )
                        }
                    }) : ""}
                </div>
            </div>
        </div>
    )
}