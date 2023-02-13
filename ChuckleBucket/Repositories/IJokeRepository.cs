﻿using ChuckleBucket.Models;
using System.Collections.Generic;

namespace ChuckleBucket.Repositories
{
    public interface IJokeRepository
    {
        List<Joke> GetAllJokes(string searchTerms);
        Joke GetById(int id);
        List<Joke> GetJokesByCategoryId(int categoryId);
        List<Joke> GetJokesByAuthorId(int authorId);
        void Add(Joke joke);
        void Update(Joke joke);
        void Remove(int id);
        void AddLaugh(int jokeId, int userId);
        List<Laugh> GetLaughsByUserId(int userId);
        void RemoveLaugh(int jokeId, int userId);
        List<Joke> GetFavoriteJokes(int userId);
    }
}
