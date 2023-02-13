import { useEffect, useState } from "react";
import { getFavoriteJokes } from "../../modules/jokesManager";
import ListJokes from "./ListJokes";



const Favorites = ({ userData }) => {
    const [jokes, setJokes] = useState([]);
    const [sortByLaughs, setSortByLaughs] = useState(false);
    const [searchTerms, setSearchTerms] = useState("%%");

    const getJokes = () => {
        return getFavoriteJokes(searchTerms)
            .then(jokesData => {
                if (sortByLaughs) {
                    jokesData.sort((a, b) => b.laughCount - a.laughCount);
                }
                setJokes(jokesData);
            })
    }

    useEffect(() => {
        getJokes();
    }, [searchTerms, sortByLaughs])

    return (
        <>
            <h1>My Favorites</h1>
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

export default Favorites;