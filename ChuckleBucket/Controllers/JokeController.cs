using ChuckleBucket.Models;
using ChuckleBucket.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ChuckleBucket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JokeController : ControllerBase
    {
        private readonly IJokeRepository _jokeRepository;

        public JokeController(IJokeRepository jokeRepository)
        {
            _jokeRepository = jokeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_jokeRepository.GetAllJokes());
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
    }
}
