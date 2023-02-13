using ChuckleBucket.Models;
using ChuckleBucket.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;

namespace ChuckleBucket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JokeController : ControllerBase
    {
        private readonly IJokeRepository _jokeRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public JokeController(IJokeRepository jokeRepository, IUserProfileRepository userProfileRepository)
        {
            _jokeRepository = jokeRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{searchTerms}")]
        public IActionResult Get(string searchTerms)
        {

            return Ok(_jokeRepository.GetAllJokes(searchTerms));
        }

        [HttpGet("edit/{id}")]
        public IActionResult GetById(int id)
        {
            Joke joke = _jokeRepository.GetById(id);
            if (joke == null)
            {
                return NotFound();
            }
            return Ok(joke);
        }

        [HttpGet("category/{id}/{searchTerms}")]
        public IActionResult Get(int id, string searchTerms)
        {
            List<Joke> jokes = _jokeRepository.GetJokesByCategoryId(id, searchTerms);
            if (jokes == null)
            {
                return NotFound();
            }
            return Ok(jokes);
        }

        [HttpGet("author/{id}/{searchTerms}")]
        public IActionResult GetByAuthor(int id, string searchTerms) 
        {
            List<Joke> jokes = _jokeRepository.GetJokesByAuthorId(id, searchTerms);
            if (jokes == null)
            {
                return NotFound();
            }
            return Ok(jokes);
        }

        [Authorize]
        [HttpGet("currentUser/{searchTerms}")]
        public IActionResult GetByCurrentUser(string searchTerms) 
        {
            UserProfile currentUser = GetCurrentUserProfile();
            List<Joke> jokes = _jokeRepository.GetJokesByAuthorId(currentUser.Id, searchTerms);
            return Ok(jokes);
        }

        [Authorize]
        [HttpGet("favorites/{searchTerms}")]
        public IActionResult GetFavorites(string searchTerms)
        {
            UserProfile currentUser = GetCurrentUserProfile();
            List<Joke> jokes = _jokeRepository.GetFavoriteJokes(currentUser.Id, searchTerms);
            return Ok(jokes);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(Joke joke) 
        {
            _jokeRepository.Add(joke);
            return NoContent();
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id,Joke joke)
        {
            if (id != joke.Id)
            {
                return BadRequest();
            }

            _jokeRepository.Update(joke);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _jokeRepository.Remove(id);
            return NoContent();
        }

        [Authorize]
        [HttpPost("laugh/{jokeId}")]
        public IActionResult PostLaugh(int jokeId)
        {
            UserProfile currentUser = GetCurrentUserProfile();
            _jokeRepository.AddLaugh(jokeId, currentUser.Id);
            return NoContent();
        }

        [Authorize]
        [HttpGet("laugh")]
        public IActionResult GetUserLaughs()
        {
            UserProfile currentUser = GetCurrentUserProfile();
            return Ok(_jokeRepository.GetLaughsByUserId(currentUser.Id));
        }

        [Authorize]
        [HttpDelete("laugh/{jokeId}")]
        public IActionResult DeleteLaugh(int jokeId)
        {
            UserProfile currentUser = GetCurrentUserProfile();
            _jokeRepository.RemoveLaugh(jokeId, currentUser.Id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
