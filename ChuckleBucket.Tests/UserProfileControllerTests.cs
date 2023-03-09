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
        public void DoesUserExist_Method_Returns_Matching_UserProfile()
        {
            // Arrange
            var profiles = CreateTestProfiles(20);
            var testFirebaseUserId = "99999";
            profiles[0].FirebaseUserId = testFirebaseUserId;
            var repo = new InMemoryUserProfileRepository(profiles);
            var contoller = new UserProfileController(repo);

            // Act
            var result = contoller.DoesUserExist(testFirebaseUserId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualProfile = Assert.IsType<UserProfile>(okResult.Value);

            Assert.Equal(testFirebaseUserId, actualProfile.FirebaseUserId);
        }

        [Fact]
        public void Get_By_Id_Returns_Matching_UserProfile()
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

        [Fact]
        public void Put_Method_Returns_BadRequest_When_Ids_Dont_Match()
        {
            // Arrange
            var profiles = CreateTestProfiles(5);
            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);
            var testId = 99;

            // Act
            var result = controller.Put(testId, new UserProfile
            {
                Id = testId + 1,
            });

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void Put_Method_Updates_A_Profile()
        {
            // Arrange
            var profiles = CreateTestProfiles(5);
            var testId = 99;
            profiles[0].Id = testId;
            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);
            
            var profileToUpdate = new UserProfile
            {
                Id = testId,
                FirstName = "Updated!",
                LastName = "Updated!",
                DisplayName = "Updated!"
            };

            // Act
            controller.Put(testId, profileToUpdate);

            // Assert
            var profileFromDB = repo.InternalData.FirstOrDefault(p => p.Id == testId);
            Assert.Equal(profileToUpdate.FirstName, profileFromDB.FirstName);
            Assert.Equal(profileToUpdate.LastName, profileFromDB.LastName);
            Assert.Equal(profileToUpdate.DisplayName, profileFromDB.DisplayName);
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
