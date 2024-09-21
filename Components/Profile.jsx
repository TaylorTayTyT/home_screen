import { useEffect, useState } from "react";

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

    if(!(profile && topItems)) return; 
    console.log(topItems)
    return (
        <div>
            {(<img src={profile.images[1].url}></img>)}
            <h1>
                {profile.display_name}
            </h1>
            {profile.uri}<br />
            {profile.followers.total}

            <div>
                {topItems.items.map(item => {
                    return (
                        <div>
                            <img src={item.images[2].url}></img>
                            {item.name}
                            {item.genres.join(", ")}
                        </div>

                    )
                })}
            </div>
        </div>
    )
}