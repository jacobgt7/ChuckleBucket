import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJokesByCategory } from "../../modules/jokesManager";
import ListJokes from "./ListJokes";


const JokeCategory = ({ userData }) => {
    const [jokes, setJokes] = useState([])
    const { id } = useParams();

    const getJokes = () => {
        getJokesByCategory(id)
            .then(jokesData => {
                setJokes(jokesData)
            })
    }

    useEffect(() => {
        getJokes()
    }, [])

    return (
        <>
            <h1>{jokes[0]?.category?.name} Jokes</h1>
            <ListJokes jokes={jokes} />
        </>
    )
}

export default JokeCategory;