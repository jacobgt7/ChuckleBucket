using ChuckleBucket.Models;
using ChuckleBucket.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace ChuckleBucket.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration config) : base(config) { }

        public List<Category> GetAllCategories()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM Category";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Category> categories = new List<Category>();
                        while (reader.Read())
                        {
                            categories.Add(new Category
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            });
                        }
                        return categories;
                    }
                }
            }
        }
    }
}
