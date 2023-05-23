import {Route, Routes} from "react-router-dom";
import AuthorizationPage from "./pages/AuthorizationPage";
import Profile from "./pages/Profile";
import Options from "./pages/Options";

function App() {
    return(
        <Routes>
            <Route path = "/" element = {<AuthorizationPage/>}></Route>
            <Route path = "/options" element = {<Options/>}></Route>
            <Route path = "/options/:access_token" element = {<Options/>}></Route>
        </Routes>
    )
}

export default App; 