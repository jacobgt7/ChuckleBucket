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

        [Fact]
        public void GetDisplayNames_Returns_List_Of_Display_Names()
        {
            // Arrange
            var profileCount = 5;
            var profiles = CreateTestProfiles(profileCount);
            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            // Act
            var result = controller.GetDisplayNames();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualDisplayNames = Assert.IsType<List<string>>(okResult.Value);

            Assert.Equal(profileCount, actualDisplayNames.Count);
        }

        [Fact]
        public void Post_Creates_A_New_UserProfile()
        {
            // Arrange
            var profileCount = 20;
            var profiles = CreateTestProfiles(profileCount);
            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            // Act
            controller.Post(new UserProfile
            {
                Id = 99,
                FirstName = "Test",
                LastName = "Test",
                DisplayName = "Test",
                Email = "Test",
            });

            // Assert
            Assert.Equal(profileCount + 1, repo.InternalData.Count);
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
