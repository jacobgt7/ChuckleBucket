import { Button, Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle } from "reactstrap";
import "./jokes.css";

const JokeCard = ({ joke }) => {


    return (
        <Card className="joke-card">
            <CardHeader>
                {joke.category.name}
            </CardHeader>
            <CardBody>
                <CardText>
                    {joke.text}
                </CardText>
                <CardText>
                    By {joke.userProfile.displayName}
                </CardText>
                <Button>
                    Laugh
                </Button>
            </CardBody>
        </Card>
    )
}

export default JokeCard;