import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { getUserLaughs } from "../../modules/jokesManager";
import JokeCard from "./JokeCard";
import SearchInput from "./SearchInput";


const ListJokes = ({ jokes, userData, getJokes, setJokes, setSortByLaughs, sortByLaughs, setSearchTerms }) => {
    const [userLaughs, setUserLaughs] = useState([]);


    const getLaughs = () => {
        getUserLaughs()
            .then(laughsData => {
                setUserLaughs(laughsData);
            });
    }

    useEffect(() => {
        getLaughs();
    }, []);

    // useEffect(() => {
    //     getJokes(searchTerms)
    //         .then(() => {
    //             if (sortByLaughs) {
    //                 let jokesCopy = structuredClone(jokes)
    //                 jokesCopy.sort((a, b) => b.laughCount - a.laughCount)
    //                 setJokes(jokesCopy)
    //             }
    //         })
    // }, [sortByLaughs, searchTerms])

    // useEffect(() => {
    //     getJokes(searchTerms)
    // }, [searchTerms])


    return (
        <>
            <SearchInput setSearchTerms={setSearchTerms} />
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