import { useEffect, useState } from "react";
import { getFavoriteJokes } from "../../modules/jokesManager";
import ListJokes from "./ListJokes";



const Favorites = ({ userData }) => {
    const [jokes, setJokes] = useState([]);

    const getJokes = () => {
        getFavoriteJokes()
            .then(jokesData => {
                setJokes(jokesData);
            })
    }

    useEffect(() => {
        getJokes();
    }, [])

    return (
        <>
            <h1>My Favorites</h1>
            <ListJokes jokes={jokes} userData={userData} getJokes={getJokes} />
        </>
    )
}

export default Favorites;