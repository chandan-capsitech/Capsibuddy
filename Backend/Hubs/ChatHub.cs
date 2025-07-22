using Microsoft.AspNetCore.SignalR;

namespace Backend.Hubs
{
    public class ChatHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            var sessionId = Context.GetHttpContext()?.Request.Query["sessionId"];
            if (!string.IsNullOrWhiteSpace(sessionId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
            }
            await base.OnConnectedAsync();
        }

        public async Task SendMessage(string sessionId, string sender, string message)
        {
            await Clients.OthersInGroup(sessionId).SendAsync("ReceiveMessage", sessionId, sender, message);
        }
    }
}