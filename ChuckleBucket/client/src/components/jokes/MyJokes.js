import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getJokesByCurrentUser } from "../../modules/jokesManager";
import ListJokes from "./ListJokes";
import "./jokes.css";


const MyJokes = ({ userData }) => {
    const [jokes, setJokes] = useState([]);
    const [sortByLaughs, setSortByLaughs] = useState(false);
    const [searchTerms, setSearchTerms] = useState("%%");

    const navigate = useNavigate();

    const getJokes = () => {
        return getJokesByCurrentUser(searchTerms)
            .then(jokesData => {
                if (sortByLaughs) {
                    jokesData.sort((a, b) => b.laughCount - a.laughCount);
                }
                setJokes(jokesData);
            })
    }

    useEffect(() => {
        getJokes()
    }, [searchTerms, sortByLaughs]);

    return (
        <>
            <h1 className="page-top margin-bottom">My Jokes</h1>
            <div className="strong-margin-bottom">
                <Button onClick={() => { navigate("/jokes/new") }}>Create New</Button>
                {" "}
                <Button onClick={() => { navigate("/jokes/favorite") }}>Favorites</Button>
            </div>
            <ListJokes jokes={jokes}
                userData={userData}
                getJokes={getJokes}
                setJokes={setJokes}
                setSortByLaughs={setSortByLaughs}
                sortByLaughs={sortByLaughs}
                setSearchTerms={setSearchTerms} />
        </>
    );
};

export default MyJokes;