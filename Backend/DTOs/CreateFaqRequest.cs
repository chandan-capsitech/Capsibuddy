using Backend.Models;

namespace Backend.DTOs
{
    public class CreateFaqRequest
    {
        public string? Question { get; set; }
        public string? Answer { get; set; }
        public List<Faq>? Options { get; set; } = new();
    }
}