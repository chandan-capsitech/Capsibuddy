using Backend.DTOs;
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
        public async Task<ApiResponse<object>> Start()
        {
            var res = new ApiResponse<object>();
            try
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
                    Message = "Hi! How can I help you today?"
                });

                var data = new
                {
                    sessionId,
                    greet = "Hi! How can I help you today?",
                    questions
                };
                res.Result = data;
                res.Status = true;
                res.Message = "Fetched successfully";
            }
            catch (Exception e)
            {
                res.Status = false;
                res.Message = e.Message;
            }
            return res;
        }

        [HttpPost("getByQuestion")]
        public async Task<ApiResponse<object>> GetByQuestion([FromBody] QuestionRequestWithSession request)
        {
            var res = new ApiResponse<object>();
            try
            {
                if (string.IsNullOrWhiteSpace(request.Question) ||
                    string.IsNullOrWhiteSpace(request.SessionId) ||
                    string.IsNullOrWhiteSpace(request.Sender))
                {
                    res.Status = false;
                    res.Message = "Required all fields";
                    return res;
                }

                var faqs = await _faqService.GetAllAsync();

                Faq found = FindFaqByQuestion(faqs, request.Question);
                if (found == null)
                {
                    res.Status = false;
                    res.Message = "Question not found";
                    return res;
                }

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

                var data = new
                {
                    answer = found.Answer,
                    options = optionQuestions
                };
                res.Result = data;
                res.Status = true;
                res.Message = "Got fetched";
            }
            catch (Exception e)
            {
                res.Status = false;
                res.Message = e.Message;
            }
            return res;
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
            return null!;
        }
    }


}