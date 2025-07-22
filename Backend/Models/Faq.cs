using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class Faq
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string? Question { get; set; }
        public string? Answer { get; set; }
        public List<Faq> Options { get; set; } = new();
    }
}