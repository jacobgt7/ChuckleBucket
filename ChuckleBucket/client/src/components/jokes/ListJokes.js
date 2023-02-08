import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { getUserLaughs } from "../../modules/jokesManager";
import JokeCard from "./JokeCard";


const ListJokes = ({ jokes, userData, getJokes, setJokes }) => {
    const [userLaughs, setUserLaughs] = useState([]);
    const [sortByLaughs, setSortByLaughs] = useState(false);



    const getLaughs = () => {
        getUserLaughs()
            .then(laughsData => {
                setUserLaughs(laughsData);
            });
    }

    useEffect(() => {
        getLaughs();
    }, []);

    useEffect(() => {
        let jokesCopy = structuredClone(jokes)
        if (sortByLaughs) {
            jokesCopy.sort((a, b) => b.laughCount - a.laughCount)
            setJokes(jokesCopy)
        }
        else {
            getJokes()
        }
    }, [sortByLaughs])


    return (
        <>
            {sortByLaughs ? <Button onClick={() => { setSortByLaughs(false) }}>Sorted By Laughs</Button>
                : <Button onClick={() => { setSortByLaughs(true) }}>Sorted By Most Recent</Button>}
            <div className="card-container">
                {jokes.map(joke => <JokeCard key={joke.id}
                    joke={joke}
                    userData={userData}
                    getJokes={getJokes}
                    userLaughs={userLaughs} />)}
            </div>
        </>
    )
}

export default ListJokes;