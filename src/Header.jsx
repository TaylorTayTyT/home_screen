import "./Header.css"
export default function Header() {
    const buttonClick = () => {
        console.log("hi")
    }
    return(
        <div id = "title">
            Spotify Diversity Test
            <a href = "/login">
            <button className="fetchData" onClick = {buttonClick}>
            </button>
            </a>
        </div>
    )
}