import { Navigate, Route, Routes } from "react-router-dom";
import ListCategories from "./categories/ListCategories";
import Home from "./jokes/Home";
import JokeCategory from "./jokes/JokeCategory";
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
                <Route path="categories" element={isLoggedIn ? <ListCategories /> : <Navigate to="/login" />} />
                <Route path="jokes/category/:id" element={isLoggedIn ? <JokeCategory /> : <Navigate to="/login" />} />

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<p>Whoops, nothing here...</p>} />
            </Route>
        </Routes>
    )
}

export default ApplicationViews;