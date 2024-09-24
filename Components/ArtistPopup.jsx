import "../src/Styles/ArtistPopup.css";
export default function ArtistPopup(props) {
    console.log(props)
    if(!props.popup) return; 
    return(
        <div className="popupContainer">
            <div>{props.popup.name}</div>
            <div>{props.popup.genres.join(", ")}</div>
        </div>
    )
}