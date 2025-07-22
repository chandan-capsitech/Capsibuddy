
namespace Backend.Models
{
    public class ConversationMessage
    {
        public string? Sender { get; set; }  // "customer" or "bot"
        public string? Message { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }

    public class ConversationMessageWithSession
    {
        public string? SessionId { get; set; }
        public string? Sender { get; set; }
        public string? Message { get; set; }
    }
}