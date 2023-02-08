import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { getAllJokes } from "../../modules/jokesManager";
import ListJokes from "./ListJokes";


const Home = ({ userData }) => {
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
            <ListJokes jokes={jokes} userData={userData} getJokes={getJokes} setJokes={setJokes} />
        </>
    )
}

export default Home;