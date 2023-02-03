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

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_jokeRepository.GetAllJokes());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Joke joke = _jokeRepository.GetById(id);
            if (joke == null)
            {
                return NotFound();
            }
            return Ok(joke);
        }

        [HttpGet("category/{id}")]
        public IActionResult Get(int id)
        {
            List<Joke> jokes = _jokeRepository.GetJokesByCategoryId(id);
            if (jokes == null)
            {
                return NotFound();
            }
            return Ok(jokes);
        }

        [HttpGet("author/{id}")]
        public IActionResult GetByAuthor(int id) 
        {
            List<Joke> jokes = _jokeRepository.GetJokesByAuthorId(id);
            if (jokes == null)
            {
                return NotFound();
            }
            return Ok(jokes);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public IActionResult GetByCurrentUser() 
        {
            UserProfile currentUser = GetCurrentUserProfile();
            List<Joke> jokes = _jokeRepository.GetJokesByAuthorId(currentUser.Id);
            if (jokes == null)
            {
                return NotFound();
            }
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

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
