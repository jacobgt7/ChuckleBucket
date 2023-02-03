import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getJokesByCurrentUser } from "../../modules/jokesManager";
import ListJokes from "./ListJokes";


const MyJokes = ({ userData }) => {
    const [jokes, setJokes] = useState([])

    const navigate = useNavigate()

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
            <Button onClick={() => { navigate("/jokes/new") }}>Create New</Button>
            <ListJokes jokes={jokes} userData={userData} />
        </>
    )
}

export default MyJokes;