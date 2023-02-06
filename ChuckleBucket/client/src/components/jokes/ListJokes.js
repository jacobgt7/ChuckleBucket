import { useEffect, useState } from "react";
import { getUserLaughs } from "../../modules/jokesManager";
import JokeCard from "./JokeCard";


const ListJokes = ({ jokes, userData, getJokes }) => {
    const [userLaughs, setUserLaughs] = useState([]);

    const getLaughs = () => {
        getUserLaughs()
            .then(laughsData => {
                setUserLaughs(laughsData);
            });
    }

    useEffect(() => {
        getLaughs()
    }, [])

    return (
        <div className="card-container">
            {jokes.map(joke => <JokeCard key={joke.id}
                joke={joke}
                userData={userData}
                getJokes={getJokes}
                userLaughs={userLaughs} />)}
        </div>
    )
}

export default ListJokes;