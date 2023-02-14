import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { getAllJokes } from "../../modules/jokesManager";
import ListJokes from "./ListJokes";


const Home = ({ userData }) => {
    const [jokes, setJokes] = useState([]);
    const [sortByLaughs, setSortByLaughs] = useState(false);
    const [searchTerms, setSearchTerms] = useState("%%");

    const getJokes = (searchTerms) => {
        return getAllJokes(searchTerms)
            .then(jokesData => {
                if (sortByLaughs) {
                    jokesData.sort((a, b) => b.laughCount - a.laughCount);
                }
                setJokes(jokesData);
            })
    }

    useEffect(() => {
        getJokes(searchTerms)
    }, [searchTerms, sortByLaughs])

    return (
        <>
            <h1 className="page-top margin-bottom">Fresh Jokes</h1>
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

export default Home;