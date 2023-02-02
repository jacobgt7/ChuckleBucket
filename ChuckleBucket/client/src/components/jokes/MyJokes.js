import { useEffect, useState } from "react";
import { getJokesByCurrentUser } from "../../modules/jokesManager";
import ListJokes from "./ListJokes";


const MyJokes = () => {
    const [jokes, setJokes] = useState([])

    const getJokes = () => {
        getJokesByCurrentUser()
            .then(jokesData => {
                setJokes(jokesData)
            })
    }

    useEffect(() => {
        getJokes()
    }, [])

    return (
        <>
            <h1>My Jokes</h1>
            <ListJokes jokes={jokes} />
        </>
    )
}

export default MyJokes;