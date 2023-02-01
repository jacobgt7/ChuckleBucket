using System;
using System.ComponentModel;

namespace ChuckleBucket.Models
{
    public class Joke
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
