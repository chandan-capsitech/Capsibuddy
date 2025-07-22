using Backend.Models;
using MongoDB.Driver;

namespace Backend.Services
{
    public class FaqService
    {
        private readonly IMongoCollection<Faq> _faqCollection;

        public FaqService(IMongoDatabase database)
        {
            _faqCollection = database.GetCollection<Faq>("FAQs");
        }

        public async Task<List<Faq>> GetAllAsync()
        {
            return await _faqCollection.Find(_ => true).ToListAsync();
        }
    }
}