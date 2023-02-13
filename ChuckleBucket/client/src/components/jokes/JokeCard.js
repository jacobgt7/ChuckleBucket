import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader, CardText } from "reactstrap";
import { addLaugh, removeLaugh } from "../../modules/jokesManager";
import "./jokes.css";

const JokeCard = ({ joke, userData, getJokes, userLaughs }) => {
    const [laughed, setLaughed] = useState(false);
    const [laughCounter, setLaughCounter] = useState(0);

    useEffect(() => {
        const mathcingLaugh = userLaughs.find(laugh => laugh.jokeId === joke.id)
        if (mathcingLaugh) {
            setLaughed(true)
        }
        setLaughCounter(joke.laughCount)
    }, [])

    const navigate = useNavigate();

    const handleLaugh = (event) => {
        event.preventDefault();

        addLaugh(joke.id)
            .then(() => {
                setLaughCounter(laughCounter + 1);
                setLaughed(true);
            });
    }

    const handleUnlaugh = (event) => {
        event.preventDefault();

        removeLaugh(joke.id)
            .then(() => {
                setLaughCounter(laughCounter - 1);
                setLaughed(false);
            })
    }

    return (
        <Card className="joke-card">
            <CardHeader>
                <Link to={`/jokes/category/${joke.categoryId}`}>{joke.category.name}</Link>
            </CardHeader>
            <CardBody>
                <CardText className="joke-card--text overflow-auto">
                    {joke.text}
                </CardText>
                <CardText>
                    By <Link to={`/jokes/author/${joke.userProfileId}`} >{joke.userProfile.displayName}
                        <img className="img-tiny" src={joke?.userProfile?.imageLocation ? joke?.userProfile?.imageLocation
                            : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"} /></Link>
                </CardText>

            </CardBody>
            <CardFooter className="joke-card--footer">
                {laughed ? <Button color="info"
                    onClick={handleUnlaugh}>
                    Laughed {`(${laughCounter})`}</Button>
                    : <Button onClick={handleLaugh}>
                        Laugh {`(${laughCounter})`}
                    </Button>}

                {joke.userProfileId === userData.id &&
                    <div className="margin-top">
                        <Button onClick={() => { navigate(`/jokes/edit/${joke.id}`) }}>Edit</Button>
                    </div>}

            </CardFooter>
        </Card>
    )
}

export default JokeCard;