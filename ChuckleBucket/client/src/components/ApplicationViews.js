import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./jokes/Home";
import Login from "./Login";
import Register from "./Register";


const ApplicationViews = ({ isLoggedIn }) => {



    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
                />

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<p>Whoops, nothing here...</p>} />
            </Route>
        </Routes>
    )
}

export default ApplicationViews;