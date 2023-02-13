import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJokesByCategory } from "../../modules/jokesManager";
import ListJokes from "./ListJokes";


const JokeCategory = ({ userData }) => {
    const [jokes, setJokes] = useState([])
    const [sortByLaughs, setSortByLaughs] = useState(false);
    const [searchTerms, setSearchTerms] = useState("%%");
    const { id } = useParams();

    const getJokes = () => {
        return getJokesByCategory(id, searchTerms)
            .then(jokesData => {
                if (sortByLaughs) {
                    jokesData.sort((a, b) => b.laughCount - a.laughCount);
                }
                setJokes(jokesData);
            })
    }

    useEffect(() => {
        getJokes()
    }, [searchTerms, sortByLaughs])

    return (
        <>
            <h1>{jokes[0]?.category?.name} Jokes</h1>
            <ListJokes jokes={jokes}
                userData={userData}
                getJokes={getJokes}
                setJokes={setJokes}
                setSortByLaughs={setSortByLaughs}
                sortByLaughs={sortByLaughs}
                setSearchTerms={setSearchTerms} />
        </>
    )
}

export default JokeCategory;