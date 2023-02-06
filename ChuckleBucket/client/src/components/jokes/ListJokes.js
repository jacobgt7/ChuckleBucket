import JokeCard from "./JokeCard";


const ListJokes = ({ jokes, userData, getJokes }) => {


    return (
        <div className="card-container">
            {jokes.map(joke => <JokeCard key={joke.id} joke={joke} userData={userData} getJokes={getJokes} />)}
        </div>
    )
}

export default ListJokes;