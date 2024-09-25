import { useEffect, useState } from "react";
import "../src/Styles/Profile.css";
import ArtistArray from "./ArtistArray";

export default function Profile(props) {
    const [profile, SetProfile] = useState();
    const [topItems, SetTopItems] = useState();
    if (!props.user) return;
    useEffect(() => {
        props.user.profile()
            .then(profile => SetProfile(profile));

        props.user.topItems()
            .then(topItems => SetTopItems(topItems));
    }, [])
    if (!profile) return;
    if (profile.error || !topItems) return;
    return (
        <div id="profileContainer">
            {(<img className="backgroundImage" src={profile.images[1].url}></img>)}
            <div>
                <div className="profileTitle">
                    <h1>hey, <span style={{ color: "#145709" }}>{profile.display_name}</span></h1>
                    <h2>{'('}AKA ${profile.uri}{')'}</h2>
                </div>
            </div>
        <ArtistArray user = {props.user} topItems = {topItems}/>
        </div>
    )
}