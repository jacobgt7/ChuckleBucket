import JokeCard from "./JokeCard";


const ListJokes = ({ jokes, userData }) => {


    return (
        <div className="card-container">
            {jokes.map(joke => <JokeCard key={joke.id} joke={joke} userData={userData} />)}
        </div>
    )
}

export default ListJokes;