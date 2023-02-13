using ChuckleBucket.Models;
using ChuckleBucket.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;

namespace ChuckleBucket.Repositories
{
    public class JokeRepository : BaseRepository, IJokeRepository
    {
        public JokeRepository(IConfiguration config) : base(config) { }

        public List<Joke> GetAllJokes(string searchTerms)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT j.Id, j.Text, j.UserProfileId, j.CategoryId, j.DateCreated,
                                                up.DisplayName, up.ImageLocation, c.Name AS CategoryName, COUNT(l.Id) AS LaughCount
                                        FROM Joke j
                                        JOIN UserProfile up ON j.UserProfileId = up.Id
                                        JOIN Category c ON j.CategoryId = c.Id
                                        LEFT JOIN Laugh l ON l.JokeId = j.Id
                                        WHERE j.Text LIKE @searchTerms
                                        GROUP BY j.Id, j.Text, j.UserProfileId, j.CategoryId, j.DateCreated, up.DisplayName, up.ImageLocation, c.Name
                                        ORDER BY j.DateCreated DESC";
                    DbUtils.AddParameter(cmd, "@searchTerms", searchTerms);
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
                                                up.DisplayName, up.ImageLocation, c.Name AS CategoryName, COUNT(l.Id) AS LaughCount
                                        FROM Joke j
                                        JOIN UserProfile up ON j.UserProfileId = up.Id
                                        JOIN Category c ON j.CategoryId = c.Id
                                        LEFT JOIN Laugh l ON l.JokeId = j.Id
                                        WHERE j.Id = @id
                                        GROUP BY j.Id, j.Text, j.UserProfileId, j.CategoryId, j.DateCreated, up.DisplayName, up.ImageLocation, c.Name";
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

        public List<Joke> GetJokesByCategoryId(int categoryId, string searchTerms) 
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT j.Id, j.Text, j.UserProfileId, j.CategoryId, j.DateCreated,
                                                up.DisplayName, up.ImageLocation, c.Name AS CategoryName, COUNT(l.Id) AS LaughCount
                                        FROM Joke j
                                        JOIN UserProfile up ON j.UserProfileId = up.Id
                                        JOIN Category c ON j.CategoryId = c.Id
                                        LEFT JOIN Laugh l ON l.JokeId = j.Id
                                        WHERE j.CategoryId = @categoryId AND j.Text LIKE @searchTerms
                                        GROUP BY j.Id, j.Text, j.UserProfileId, j.CategoryId, j.DateCreated, up.DisplayName, up.ImageLocation, c.Name
                                        ORDER BY j.DateCreated DESC";
                    DbUtils.AddParameter(cmd, "@categoryId", categoryId);
                    DbUtils.AddParameter(cmd, "@searchTerms", searchTerms);

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

        public List<Joke> GetJokesByAuthorId(int authorId, string searchTerms) 
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT j.Id, j.Text, j.UserProfileId, j.CategoryId, j.DateCreated,
                                                up.DisplayName, up.ImageLocation, c.Name AS CategoryName, COUNT(l.Id) AS LaughCount
                                        FROM Joke j
                                        JOIN UserProfile up ON j.UserProfileId = up.Id
                                        JOIN Category c ON j.CategoryId = c.Id
                                        LEFT JOIN Laugh l ON l.JokeId = j.Id
                                        WHERE j.UserProfileId = @authorId AND j.Text LIKE @searchTerms
                                        GROUP BY j.Id, j.Text, j.UserProfileId, j.CategoryId, j.DateCreated, up.DisplayName, up.ImageLocation, c.Name
                                        ORDER BY j.DateCreated DESC";
                    DbUtils.AddParameter(cmd, "@authorId", authorId);
                    DbUtils.AddParameter(cmd, "@searchTerms", searchTerms);

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

        public List<Joke> GetFavoriteJokes(int userId, string searchTerms)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT j.Id, j.Text, j.UserProfileId, j.CategoryId, j.DateCreated,
                                                up.DisplayName, up.ImageLocation, c.Name AS CategoryName, COUNT(l.Id) AS LaughCount
                                        FROM Joke j
                                        JOIN UserProfile up ON j.UserProfileId = up.Id
                                        JOIN Category c ON j.CategoryId = c.Id
                                        JOIN Laugh l ON l.JokeId = j.Id
                                        WHERE l.UserProfileId = @userId AND j.Text LIKE @searchTerms
                                        GROUP BY j.Id, j.Text, j.UserProfileId, j.CategoryId, j.DateCreated, up.DisplayName, up.ImageLocation, c.Name
                                        ORDER BY j.DateCreated DESC";
                    DbUtils.AddParameter(cmd, "@userId", userId);
                    DbUtils.AddParameter(cmd, "@searchTerms", searchTerms);

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

        public void Remove(int id)
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Joke
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void AddLaugh(int jokeId, int userId) 
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Laugh (JokeId, UserProfileId)
                                        VALUES (@jokeId, @userProfileId)";
                    DbUtils.AddParameter(cmd, "@jokeId", jokeId);
                    DbUtils.AddParameter(cmd, "@userProfileId", userId);

                    try 
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (SqlException)
                    {
                        return;
                    }
                }
            }
        }

        public List<Laugh> GetLaughsByUserId(int userId)
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, JokeId, UserProfileId
                                        FROM Laugh
                                        WHERE UserProfileId = @userId";
                    DbUtils.AddParameter(cmd, "@userId", userId);

                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Laugh> laughs = new List<Laugh>();
                        while (reader.Read())
                        {
                            laughs.Add(new Laugh
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                JokeId = DbUtils.GetInt(reader, "JokeId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                            });
                        }
                        return laughs;
                    }
                }
            }
        }

        public void RemoveLaugh(int jokeId, int userId)
        {
            using(SqlConnection conn = Connection)
            {
                conn.Open();
                using(SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Laugh
                                        WHERE JokeId = @jokeId AND UserProfileId = @userId";
                    DbUtils.AddParameter(cmd, "@jokeId", jokeId);
                    DbUtils.AddParameter(cmd, "@userId", userId);

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
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                },
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                Category = new Category
                {
                    Name = DbUtils.GetString(reader, "CategoryName"),
                },
                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                LaughCount = DbUtils.GetInt(reader, "LaughCount")
            };
        }
    }
}
