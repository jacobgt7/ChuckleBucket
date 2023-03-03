using ChuckleBucket.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChuckleBucket.Tests.Mocks
{
    class InMemoryUserProfileRepository
    {
        private readonly List<UserProfile> _data;

        public List<UserProfile> InternalData { get { return _data; } }

        public InMemoryUserProfileRepository(List<UserProfile> startingData)
        {
            _data = startingData;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            throw new NotImplementedException();
        }

        public UserProfile GetById(int id)
        {
            return _data.FirstOrDefault(p => p.Id == id);
        }

        public List<UserProfile> GetAllUsers()
        {
            return _data;
        }

        public void Add(UserProfile userProfile)
        {
            _data.Add(userProfile);
        }
    }
}
