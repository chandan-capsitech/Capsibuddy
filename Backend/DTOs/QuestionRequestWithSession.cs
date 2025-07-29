namespace Backend.DTOs
{
    public class QuestionRequestWithSession
    {
        public string? Question { get; set; }
        public string? SessionId { get; set; }
        public string? Sender { get; set; }
    }
}