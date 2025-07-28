using Backend.Models;
using MongoDB.Driver;

namespace Backend.Services
{
    public class ConversationService
    {
        private readonly IMongoCollection<Conversation> _conversations;

        public ConversationService(IMongoDatabase database)
        {
            _conversations = database.GetCollection<Conversation>("conversations");
        }

        public async Task AddMessageAsync(ConversationMessageWithSession msg)
        {
            var filter = Builders<Conversation>.Filter.Eq(x => x.SessionId, msg.SessionId);
            var update = Builders<Conversation>.Update.Push(x => x.Chat, new ConversationMessage
            {
                Sender = msg.Sender,
                Message = msg.Message,
                Timestamp = DateTime.UtcNow
            });
            var options = new UpdateOptions { IsUpsert = true };
            await _conversations.UpdateOneAsync(filter, update, options);
        }
    }
}