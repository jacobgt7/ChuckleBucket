using ChuckleBucket.Models;
using ChuckleBucket.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChuckleBucket.Tests.Mocks
{
    class InMemoryCategoryRepository : ICategoryRepository
    {
        private readonly List<Category> _data;

        public List<Category> InternalData { get { return _data; } }

        public InMemoryCategoryRepository(List<Category> startingData)
        {
            _data = startingData;
        }

        public List<Category> GetAllCategories()
        {
            return _data;
        }
    }
}
