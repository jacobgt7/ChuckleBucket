import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle } from "reactstrap";
import "./jokes.css";

const JokeCard = ({ joke }) => {


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
                <Button>
                    Laugh
                </Button>
            </CardBody>
        </Card>
    )
}

export default JokeCard;