import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ListCategories from "./categories/ListCategories";
import Home from "./jokes/Home";
import JokeAuthor from "./jokes/JokeAuthor";
import JokeCategory from "./jokes/JokeCategory";
import JokeForm from "./jokes/JokeForm";
import MyJokes from "./jokes/MyJokes";
import Login from "./Login";
import Register from "./Register";


const ApplicationViews = ({ isLoggedIn, setUserData, userData }) => {



    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={isLoggedIn ? <Home userData={userData} /> : <Navigate to="/login" />}
                />
                <Route path="categories" element={isLoggedIn ? <ListCategories /> : <Navigate to="/login" />} />

                <Route path="jokes/category/:id" element={isLoggedIn ? <JokeCategory userData={userData} /> : <Navigate to="/login" />} />
                <Route path="jokes/author/:id" element={isLoggedIn ? <JokeAuthor userData={userData} /> : <Navigate to="/login" />} />
                <Route path="jokes/my" element={isLoggedIn ? <MyJokes userData={userData} /> : <Navigate to="/login" />} />
                <Route path="jokes/new" element={isLoggedIn ? <JokeForm userData={userData} /> : <Navigate to="/login" />} />

                <Route path="login" element={<Login setUserData={setUserData} />} />
                <Route path="register" element={<Register setUserData={setUserData} />} />
                <Route path="*" element={<p>Whoops, nothing here...</p>} />
            </Route>
        </Routes>
    )
}

export default ApplicationViews;