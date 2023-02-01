using ChuckleBucket.Models;
using System.Collections.Generic;

namespace ChuckleBucket.Repositories
{
    public interface IJokeRepository
    {
        List<Joke> GetAllJokes();
        List<Joke> GetJokesByCategoryId(int categoryId);
    }
}
