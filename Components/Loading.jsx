import loading from "../assets/loading.gif";
import "../src/Styles/Loading.css";
export default function Loading(){
    return(<div className="image-container">
        <img id="loadingGif" src={loading}></img>
        <p className="text-bottom">Loading</p>
    </div>)
}