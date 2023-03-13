using ChuckleBucket.Controllers;
using ChuckleBucket.Models;
using ChuckleBucket.Tests.Mocks;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace ChuckleBucket.Tests
{
    internal class JokeControllerTests
    {
        [Fact]
        public void Get_Method_Returns_All_Jokes()
        {
            // Arrange
            var jokeCount = 20;
            var jokes = CreateTestJokes(jokeCount);
            var repo = new InMemoryJokeRepository(jokes);
            var controller = new JokeController(repo);
            var testSearchTerms = "";

            // Act
            var result = controller.Get(testSearchTerms);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualJokes = Assert.IsType<List<Joke>>(okResult.Value);

            Assert.Equal(jokeCount, actualJokes.Count);
        }

        private List<Joke> CreateTestJokes(int count)
        {
            var jokes = new List<Joke>();
            for (int i = 1; i <= count; i++)
            {
                jokes.Add(new Joke
                {
                    Id = i,
                    Text = $"Text {i}",
                    UserProfileId = i,
                    CategoryId = i,
                    DateCreated = DateTime.Now
                });
            }
            return jokes;
        }

        private List<Laugh> CreateTestLaughs(int count)
        {
            var laughs = new List<Laugh>();
            for (int i = 1; i <= count; i++)
            {
                laughs.Add(new Laugh
                {
                    Id = i,
                    UserProfileId = i,
                    JokeId = i,
                });
            }
            return laughs;
        }
    }
}
