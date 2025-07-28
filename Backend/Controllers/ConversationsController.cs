using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConversationsController : ControllerBase
    {
        private readonly ConversationService _conversationService;

        public ConversationsController(ConversationService conversationService)
        {
            _conversationService = conversationService;
        }

        [HttpPost]
        public async Task<ApiResponse<string>> Post([FromBody] ConversationMessageWithSession message)
        {
            var res = new ApiResponse<string>();
            try
            {
                if (message == null || string.IsNullOrWhiteSpace(message.SessionId))
                {
                    res.Message = "Fields are required";
                    res.Status = false;
                    return res;
                }

                await _conversationService.AddMessageAsync(message);
                res.Status = true;
                res.Message = "Message sent";
                res.Result = message.Message;
            }
            catch (Exception ex)
            {
                res.Message = ex.Message;
                res.Status = false;
            }
            return res;
        }
    }
}