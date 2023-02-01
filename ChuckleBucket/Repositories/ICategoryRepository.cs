using ChuckleBucket.Models;
using System.Collections.Generic;

namespace ChuckleBucket.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
    }
}