using ChuckleBucket.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChuckleBucket.Tests.Mocks
{
    internal class InMemoryJokeRepository
    {
        private readonly List<Joke> _data;
        private readonly List<Laugh> _laughData;

        public List<Joke> InternalData { get { return _data; } }
        public List<Laugh> IntenalLaughs { get { return _laughData; } }
        public InMemoryJokeRepository(List<Joke> startingData)
        {
            _data = startingData;
        }

        public InMemoryJokeRepository(List<Laugh> startingData)
        {
            _laughData = startingData;
        }

        public InMemoryJokeRepository(List<Joke> startingJokes, List<Laugh> startingLaughs)
        {
            _data = startingJokes;
            _laughData = startingLaughs;
        }

        public List<Joke> GetAllJokes(string searchTerms)
        {
            return _data;
        }

        public Joke GetById(int id)
        {
            return _data.FirstOrDefault(j => j.Id == id);
        }

        public List<Joke> GetJokesByCategoryId(int categoryId, string searchTerms)
        {
            return _data.Where(j => j.CategoryId == categoryId).ToList();
        }

        public List<Joke> GetJokesByAuthorId(int authorId, string searchTerms)
        {
            return _data.Where(j => j.UserProfileId == authorId).ToList();
        }

        public void Add(Joke joke)
        {
            _data.Add(joke);
        }

        public void Update(Joke joke)
        {
            var jokeToUpdate = _data.FirstOrDefault(j => j.Id == joke.Id);
            if (jokeToUpdate == null)
            {
                return;
            }
            jokeToUpdate.Text = joke.Text;
            jokeToUpdate.CategoryId = joke.CategoryId;
        }

        public void Remove(int id)
        {
            var jokeToDelete = _data.FirstOrDefault(j => j.Id == id);
            _data.Remove(jokeToDelete);
        }

        public void AddLaugh(int jokeId, int userId)
        {
            _laughData.Add(new Laugh
            {
                Id = 1,
                UserProfileId = userId,
                JokeId = jokeId,
            });
        }

        public List<Laugh> GetLaughsByUserId(int userId)
        {
            return _laughData.Where(l => l.UserProfileId == userId).ToList();
        }

        public void RemoveLaugh(int jokeId, int userId)
        {
            var laughToRemove = _laughData.FirstOrDefault(l => l.JokeId == jokeId && l.UserProfileId == userId);
            _laughData.Remove(laughToRemove);
        }

        public List<Joke> GetFavoriteJokes(int userId, string searchTerms)
        {
            throw new NotImplementedException;
        }
    }
}
