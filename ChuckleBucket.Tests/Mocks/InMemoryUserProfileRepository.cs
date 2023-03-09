using ChuckleBucket.Models;
using ChuckleBucket.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChuckleBucket.Tests.Mocks
{
    class InMemoryUserProfileRepository : IUserProfileRepository
    {
        private readonly List<UserProfile> _data;

        public List<UserProfile> InternalData { get { return _data; } }

        public InMemoryUserProfileRepository(List<UserProfile> startingData)
        {
            _data = startingData;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _data.FirstOrDefault(p => p.FirebaseUserId == firebaseUserId);
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

        public void Update(UserProfile userProfile)
        {
            var currentProfile = _data.FirstOrDefault(p => p.Id == userProfile.Id);
            if (currentProfile == null) 
            {
                return;
            }
            currentProfile.FirstName = userProfile.FirstName;
            currentProfile.LastName = userProfile.LastName;
            currentProfile.Email = userProfile.Email;
            currentProfile.DisplayName = userProfile.DisplayName;
            currentProfile.ImageLocation = userProfile.ImageLocation;
        }
    }
}
