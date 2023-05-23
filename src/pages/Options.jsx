import { useParams } from "react-router-dom"

function Options() {

    //this is the access token to fetch the data 
    const {access_token} = useParams();
    return(
    <>
        <nav>
            <li>profile</li>
            <li>playlists</li>
            <li>podcasts</li>
            <li>artists</li>
            <li>tracks</li>
        </nav>
        </>
    )
}

export default Options;