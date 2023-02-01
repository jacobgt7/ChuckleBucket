import { useEffect, useState } from "react";
import { getAllJokes } from "../../modules/jokesManager";
import ListJokes from "./ListJokes";


const Home = () => {
    const [jokes, setJokes] = useState([]);

    const getJokes = () => {
        getAllJokes()
            .then(jokeData => {
                setJokes(jokeData)
            })
    }

    useEffect(() => {
        getJokes()
    }, [])

    return (
        <>
            <h1>Fresh Jokes</h1>
            <ListJokes jokes={jokes} />
        </>
    )
}

export default Home;