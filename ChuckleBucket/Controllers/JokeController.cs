using ChuckleBucket.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}
