using ChuckleBucket.Models;
using ChuckleBucket.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ChuckleBucket.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration config) : base(config) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT up.Id, up.FirebaseUserId, up.DisplayName, up.FirstName, up.LastName,
                                                up.Email, up.ImageLocation, up.UserRoleId, up.Activated,
                                                r.Name AS RoleName
                                        FROM UserProfile up
                                        JOIN UserRole r ON up.UserRoleId = r.Id
                                        WHERE FirebaseUserId = @firebaseUserId";
                    cmd.Parameters.AddWithValue("@firebaseUserId", firebaseUserId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        UserProfile userProfile = null;

                        if (reader.Read())
                        {
                            userProfile = new UserProfile
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                UserRoleId = DbUtils.GetInt(reader, "UserRoleId"),
                                UserRole = new UserRole
                                {
                                    Name = DbUtils.GetString(reader, "RoleName")
                                },
                                Acitvated = DbUtils.GetBool(reader, "Activated")
                            };
                        }
                        return userProfile;
                    }
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT up.Id, up.FirebaseUserId, up.DisplayName, up.FirstName, up.LastName,
                                                up.Email, up.ImageLocation, up.UserRoleId, up.Activated,
                                                r.Name AS RoleName
                                        FROM UserProfile up
                                        JOIN UserRole r ON up.UserRoleId = r.Id
                                        WHERE up.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    
                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        UserProfile userProfile = null;
                        if (reader.Read())
                        {
                            userProfile = NewUserProfileFromReader(reader);
                        }
                        return userProfile;
                    }
                }
            }
        }

        public UserProfile NewUserProfileFromReader(SqlDataReader reader)
        {
            return new UserProfile
            {
                Id = DbUtils.GetInt(reader, "Id"),
                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                FirstName = DbUtils.GetString(reader, "FirstName"),
                LastName = DbUtils.GetString(reader, "LastName"),
                Email = DbUtils.GetString(reader, "Email"),
                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                UserRoleId = DbUtils.GetInt(reader, "UserRoleId"),
                UserRole = new UserRole
                {
                    Name = DbUtils.GetString(reader, "RoleName")
                },
                Acitvated = DbUtils.GetBool(reader, "Activated")
            };
        }
    }
}
