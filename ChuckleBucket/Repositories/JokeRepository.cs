using ChuckleBucket.Models;
using ChuckleBucket.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System;

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
                            jokes.Add(NewJokeFromReader(reader));
                        }
                        return jokes;
                    }
                }
            }
        }

        public Joke GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT j.Id, j.Text, j.UserProfileId, j.CategoryId, j.DateCreated,
                                                up.DisplayName, c.Name AS CategoryName
                                        FROM Joke j
                                        JOIN UserProfile up ON j.UserProfileId = up.Id
                                        JOIN Category c ON j.CategoryId = c.Id
                                        WHERE j.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Joke joke = null;
                        if (reader.Read())
                        {
                            joke = NewJokeFromReader(reader);
                        }
                        return joke;
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
                            jokes.Add(NewJokeFromReader(reader));
                        }
                        return jokes;
                    }
                }
            }
        }

        public List<Joke> GetJokesByAuthorId(int authorId) 
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
                                        WHERE j.UserProfileId = @authorId
                                        ORDER BY j.DateCreated DESC";
                    DbUtils.AddParameter(cmd, "@authorId", authorId);

                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var jokes = new List<Joke>();

                        while (reader.Read())
                        {
                            jokes.Add(NewJokeFromReader(reader));
                        }
                        return jokes;
                    }
                }
            }
        }

        public void Add(Joke joke)
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Joke (Text,
                                                          UserProfileId,
                                                            CategoryId,
                                                            DateCreated)
                                        VALUES (@text,
                                                @userProfileId,
                                                @categoryId,
                                                @dateCreated)";
                    DbUtils.AddParameter(cmd, "@text", joke.Text);
                    DbUtils.AddParameter(cmd, "@userProfileId", joke.UserProfileId);
                    DbUtils.AddParameter(cmd, "@categoryId", joke.CategoryId);
                    DbUtils.AddParameter(cmd, "@dateCreated", DateTime.Now);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Joke joke)
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Joke
                                        SET Text = @text,
                                            CategoryId = @categoryId
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@text", joke.Text);
                    DbUtils.AddParameter(cmd, "@categoryId", joke.CategoryId);
                    DbUtils.AddParameter(cmd, "@id", joke.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Joke NewJokeFromReader(SqlDataReader reader)
        {
            return new Joke
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
            };
        }
    }
}
