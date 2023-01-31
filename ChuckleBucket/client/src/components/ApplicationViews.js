import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";


const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={isLoggedIn ? <Login /> : <Navigate to="/login" />}
                />
                <Route
                    path="add"
                    element={isLoggedIn ? <Login /> : <Navigate to="/login" />}
                />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<p>Whoops, nothing here...</p>} />
            </Route>
        </Routes>
    )
}

export default ApplicationViews;