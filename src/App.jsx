import {Route, Routes} from "react-router-dom";
import AuthorizationPage from "./pages/AuthorizationPage";
import Options from "./pages/Options";
import Test from "./pages/Test";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return(
        <Routes>
            <Route path = "/" element = {<AuthorizationPage/>}></Route>
            <Route path = "/options" element = {<Options/>}></Route>
            <Route path = "/options/:access_token" element = {<Options/>}></Route>
            <Route path = "/test" element={<Test/>}></Route>
        </Routes>
    )
}

export default App; 