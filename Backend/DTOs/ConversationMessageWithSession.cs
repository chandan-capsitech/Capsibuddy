namespace Backend.DTOs
{
    public class ConversationMessageWithSession
    {
        public string? SessionId { get; set; }
        public string? Sender { get; set; }
        public string? Message { get; set; }
    }
}