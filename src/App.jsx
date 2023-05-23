import {Route, Routes} from "react-router-dom";
import AuthorizationPage from "./pages/AuthorizationPage";
function App() {
    return(
        <Routes>
            <Route path = "/" element = {<AuthorizationPage/>}></Route>
        </Routes>
    )
}

export default App; 