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
    public class UserProfileControllerTests
    {
        [Fact]
        public void Get_By_Id_Returns_Mathcing_UserProfile()
        {
            // Arrange
            var profiles = CreateTestProfiles(20);
            var testId = 99;
            profiles[0].Id = testId;
            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            // Act
            var result = controller.Get(testId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualProfile = Assert.IsType<UserProfile>(okResult.Value);

            Assert.Equal(testId, actualProfile.Id);
        }

        private List<UserProfile> CreateTestProfiles(int count)
        {
            var profiles = new List<UserProfile>();
            for (int i = 1; i <= count; i++)
            {
                profiles.Add(new UserProfile
                {
                    Id = i,
                    FirstName = $"FirstName {i}",
                    LastName = $"LastName {i}",
                    DisplayName = $"DisplayName {i}",
                    Email = $"Email{i}@email.com",
                    ImageLocation = $"imagelocation{i}"
                });
            }
            return profiles;
        }
    }
}
