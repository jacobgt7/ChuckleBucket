import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getJokesByCurrentUser } from "../../modules/jokesManager";
import ListJokes from "./ListJokes";
import "./jokes.css";


const MyJokes = ({ userData }) => {
    const [jokes, setJokes] = useState([]);

    const navigate = useNavigate();

    const getJokes = () => {
        getJokesByCurrentUser()
            .then(jokesData => {
                setJokes(jokesData)
            })
    };

    useEffect(() => {
        getJokes()
    }, []);

    return (
        <>
            <h1>My Jokes</h1>
            <div className="margin-bottom">
                <Button onClick={() => { navigate("/jokes/new") }}>Create New</Button>
                {" "}
                <Button onClick={() => { navigate("/jokes/favorite") }}>Favorites</Button>
            </div>
            <ListJokes jokes={jokes} userData={userData} getJokes={getJokes} setJokes={setJokes} />
        </>
    );
};

export default MyJokes;