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

        // Get all
        public async Task<List<Faq>> GetAllAsync()
        {
            return await _faqCollection.Find(_ => true).ToListAsync();
        }

        // Admin functions
        // Create FAQ
        public async Task CreateAsync(Faq faq)
        {
            await _faqCollection.InsertOneAsync(faq);
        }

        // Get By id
        public async Task<Faq> GetByIdAsync(string id)
        {
            return await _faqCollection.Find(f => f.Id == id).FirstOrDefaultAsync();
        }

        // Update FAQ
        public async Task<bool> UpdateAsync(string id, string question, string answer, List<Faq> Options)
        {
            var update = Builders<Faq>.Update
                .Set(f => f.Question, question)
                .Set(f => f.Answer, answer)
                .Set(f => f.Options, Options);

            var result = await _faqCollection.UpdateOneAsync(f => f.Id == id, update);
            return result.ModifiedCount > 0;
        }

        // Delete FAQ
        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _faqCollection.DeleteOneAsync(f => f.Id == id);
            return result.DeletedCount > 0;
        }
    }
}