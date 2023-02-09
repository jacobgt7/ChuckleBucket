import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJokesByAuthor } from "../../modules/jokesManager";
import ListJokes from "./ListJokes";
import "./jokes.css";


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
            <div className="author-header">
                <img className="author-header--image" src={jokes[0]?.userProfile?.imageLocation ?
                    jokes[0]?.userProfile?.imageLocation
                    : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"} />
                <h1>{jokes[0]?.userProfile?.displayName}'s Jokes</h1>
            </div>
            <ListJokes jokes={jokes} userData={userData} getJokes={getJokes} setJokes={setJokes} />
        </>
    )
}

export default JokeAuthor;