using ChuckleBucket.Controllers;
using ChuckleBucket.Models;
using ChuckleBucket.Tests.Mocks;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Xunit;

namespace ChuckleBucket.Tests
{
    public class CategoryControllerTests
    {
        [Fact]
        public void Get_Returns_All_Categories()
        {
            // Arrange
            var categoryCount = 10;
            var categories = CreateTestCategories(categoryCount);
            var repo = new InMemoryCategoryRepository(categories);
            var controller = new CategoryController(repo);

            // Act
            var result = controller.Get(); 

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualCategories = Assert.IsType<List<Category>>(okResult.Value);

            Assert.Equal(categoryCount, actualCategories.Count);
            
        }

        private List<Category> CreateTestCategories(int count)
        {
            List<Category> categories = new List<Category>();
            for (int i = 1; i <= count; i++)
            {
                categories.Add(new Category
                {
                    Id = i,
                    Name = $"Category {i}"
                });
            }
            return categories;
        }
    }
}
