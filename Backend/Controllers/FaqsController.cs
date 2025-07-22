using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FaqsController : ControllerBase
    {
        private readonly FaqService _faqService;
        private readonly ConversationService _conversationService;

        public FaqsController(FaqService faqService, ConversationService conversationService)
        {
            _faqService = faqService;
            _conversationService = conversationService;
        }

        [HttpPost("start")]
        public async Task<IActionResult> Start()
        {
            var sessionId = Guid.NewGuid().ToString();
            var faqs = await _faqService.GetAllAsync();

            var questions = new List<object>();
            foreach (var faq in faqs)
                questions.Add(new { faq.Question });

            // Save greet message in conversation
            await _conversationService.AddMessageAsync(new ConversationMessageWithSession
            {
                SessionId = sessionId,
                Sender = "bot",
                Message = "Hi! How can I help you today? Please choose a question below."
            });

            return Ok(new
            {
                sessionId,
                greet = "Hi! How can I help you today? Please choose a question below.",
                questions
            });
        }

        [HttpPost("getByQuestion")]
        public async Task<IActionResult> GetByQuestion([FromBody] QuestionRequestWithSession request)
        {
            if (string.IsNullOrWhiteSpace(request.Question))
                return BadRequest("Question is required.");
            if (string.IsNullOrWhiteSpace(request.SessionId))
                return BadRequest("SessionId is required.");
            if (string.IsNullOrWhiteSpace(request.Sender))
                return BadRequest("Sender is required.");

            var faqs = await _faqService.GetAllAsync();

            Faq found = FindFaqByQuestion(faqs, request.Question);
            if (found == null)
                return NotFound("Question not found.");

            // Save user's question message
            await _conversationService.AddMessageAsync(new ConversationMessageWithSession
            {
                SessionId = request.SessionId,
                Sender = request.Sender,
                Message = request.Question
            });

            // Save bot's answer message
            await _conversationService.AddMessageAsync(new ConversationMessageWithSession
            {
                SessionId = request.SessionId,
                Sender = "bot",
                Message = found.Answer
            });

            var optionQuestions = new List<object>();
            if (found.Options != null)
            {
                foreach (var opt in found.Options)
                    optionQuestions.Add(new { opt.Question });
            }

            return Ok(new
            {
                answer = found.Answer,
                options = optionQuestions
            });
        }

        private Faq FindFaqByQuestion(IEnumerable<Faq> faqs, string question)
        {
            foreach (var faq in faqs)
            {
                if (string.Equals(faq.Question, question, StringComparison.OrdinalIgnoreCase))
                    return faq;

                if (faq.Options != null)
                {
                    var found = FindFaqByQuestion(faq.Options, question);
                    if (found != null)
                        return found;
                }
            }
            return null;
        }
    }


}