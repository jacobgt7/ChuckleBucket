using ChuckleBucket.Models;
using System.Collections.Generic;

namespace ChuckleBucket.Repositories
{
    public interface IJokeRepository
    {
        List<Joke> GetAllJokes();
        Joke GetById(int id);
        List<Joke> GetJokesByCategoryId(int categoryId);
        List<Joke> GetJokesByAuthorId(int authorId);
        void Add(Joke joke);
        void Update(Joke joke);
    }
}
