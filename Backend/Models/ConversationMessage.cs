namespace Backend.Models
{
    public class ConversationMessage
    {
        public string? Sender { get; set; }  // "customer" or "bot"
        public string? Message { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }

}
