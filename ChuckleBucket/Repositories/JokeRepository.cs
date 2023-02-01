using ChuckleBucket.Models;
using ChuckleBucket.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace ChuckleBucket.Repositories
{
    public class JokeRepository : BaseRepository, IJokeRepository
    {
        public JokeRepository(IConfiguration config) : base(config) { }

        public List<Joke> GetAllJokes()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT j.Id, j.Text, j.UserProfileId, j.CategoryId, j.DateCreated,
                                                up.DisplayName, c.Name AS CategoryName
                                        FROM Joke j
                                        JOIN UserProfile up ON j.UserProfileId = up.Id
                                        JOIN Category c ON j.CategoryId = c.Id
                                        ORDER BY j.DateCreated DESC";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var jokes = new List<Joke>();

                        while (reader.Read())
                        {
                            jokes.Add(new Joke
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Text = DbUtils.GetString(reader, "Text"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile
                                {
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                },
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                Category = new Category
                                {
                                    Name = DbUtils.GetString(reader, "CategoryName"),
                                },
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                            });
                        }
                        return jokes;
                    }
                }
            }
        }

        public List<Joke> GetJokesByCategoryId(int categoryId) 
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT j.Id, j.Text, j.UserProfileId, j.CategoryId, j.DateCreated,
                                                up.DisplayName, c.Name AS CategoryName
                                        FROM Joke j
                                        JOIN UserProfile up ON j.UserProfileId = up.Id
                                        JOIN Category c ON j.CategoryId = c.Id
                                        WHERE j.CategoryId = @categoryId
                                        ORDER BY j.DateCreated DESC";
                    DbUtils.AddParameter(cmd, "@categoryId", categoryId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var jokes = new List<Joke>();

                        while (reader.Read())
                        {
                            jokes.Add(new Joke
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Text = DbUtils.GetString(reader, "Text"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile
                                {
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                },
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                Category = new Category
                                {
                                    Name = DbUtils.GetString(reader, "CategoryName"),
                                },
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                            });
                        }
                        return jokes;
                    }
                }
            }
        }
    }
}
