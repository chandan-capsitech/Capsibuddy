using Backend.Models;

namespace Backend.DTOs
{
    public class UpdateFaqRequest
    {
        public string? Question { get; set; }
        public string? Answer { get; set; }
        public List<Faq>? Options { get; set; }
    }
}
