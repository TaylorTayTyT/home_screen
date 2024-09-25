import { useEffect, useState } from "react";
import "../src/Styles/ArtistArray.css";
import ArtistPopup from "./ArtistPopup";

export default function ArtistArray(props) {
    const [popup, SetPopup] = useState();
    const artistPopup = (e) =>{
        const artistIdx = parseInt(e.target.attributes.datakey.value);
        SetPopup(props.topItems.items[artistIdx]);
    };
    useEffect(()=>{
        document.querySelectorAll(".artistItem").forEach(artistItem => {
            artistItem.onclick = artistPopup;
        })
    });
    return (
        <>
        <p className="artistArrayLabel nanum-myeongjo-regular"><b>Your favorite artists</b></p>
        {popup ? <div className="overlay"></div> : ""}
        <div id="artistArrayContainer">
            <ArtistPopup user = {props.user} popup = {popup} SetPopup = {SetPopup}/>
            {props.topItems.items.map((item, index) => {
                return (
                    <div className="artistItem koulen-regular">
                        <img key={index} datakey = {index} className="artistItemPhoto" src={item.images[2].url}></img>
                        {index + 1}. {item.name}
                    </div>
                )
            })}
        </div>
        </>
    )
}