using ChuckleBucket.Models;

namespace ChuckleBucket.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}