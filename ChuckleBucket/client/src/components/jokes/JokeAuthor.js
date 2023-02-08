import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJokesByAuthor } from "../../modules/jokesManager";
import ListJokes from "./ListJokes";


const JokeAuthor = ({ userData }) => {
    const [jokes, setJokes] = useState([])
    const { id } = useParams();

    const getJokes = () => {
        getJokesByAuthor(id)
            .then(jokesData => {
                setJokes(jokesData)
            })
    }

    useEffect(() => {
        getJokes()
    }, [])

    return (
        <>
            <h1>{jokes[0]?.userProfile?.displayName}'s Jokes</h1>
            <ListJokes jokes={jokes} userData={userData} getJokes={getJokes} setJokes={setJokes} />
        </>
    )
}

export default JokeAuthor;