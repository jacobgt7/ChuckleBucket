using Microsoft.AspNetCore.Identity;
using System.Diagnostics;

namespace ChuckleBucket.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string FirebaseUserId { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ImageLocation { get; set; }
        public int UserRoleId { get; set; }
        public UserRole UserRole { get; set; }
        public bool Acitvated { get; set; }
    }
}
