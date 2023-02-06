import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { addLaugh } from "../../modules/jokesManager";
import "./jokes.css";

const JokeCard = ({ joke, userData, getJokes }) => {
    const navigate = useNavigate();

    const handleLaugh = (event) => {
        event.preventDefault();

        addLaugh(joke.id)
            .then(() => {
                getJokes();
            });
    }

    return (
        <Card className="joke-card">
            <CardHeader>
                <Link to={`/jokes/category/${joke.categoryId}`}>{joke.category.name}</Link>
            </CardHeader>
            <CardBody>
                <CardText>
                    {joke.text}
                </CardText>
                <CardText>
                    By <Link to={`/jokes/author/${joke.userProfileId}`} >{joke.userProfile.displayName}</Link>
                </CardText>

                <Button onClick={handleLaugh}>
                    Laugh {`(${joke.laughCount})`}
                </Button>

                {joke.userProfileId === userData.id &&
                    <div>
                        <Button onClick={() => { navigate(`/jokes/edit/${joke.id}`) }}>Edit</Button>
                    </div>}
            </CardBody>
        </Card>
    )
}

export default JokeCard;