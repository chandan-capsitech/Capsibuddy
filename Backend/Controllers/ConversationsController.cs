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
        public async Task<IActionResult> Post([FromBody] ConversationMessageWithSession message)
        {
            if (message == null || string.IsNullOrWhiteSpace(message.SessionId))
                return BadRequest("SessionId and message are required.");

            await _conversationService.AddMessageAsync(message);
            return Ok();
        }
    }
}