import JokeCard from "./JokeCard";


const ListJokes = ({ jokes }) => {


    return (
        <div className="card-container">
            {jokes.map(joke => <JokeCard key={joke.id} joke={joke} />)}
        </div>
    )
}

export default ListJokes;