using Backend.Hubs;
using Backend.Services;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// MongoDB setup
var mongoClient = new MongoClient("mongodb://localhost:27017");
var database = mongoClient.GetDatabase("ChatBot");

builder.Services.AddSingleton(database);

// Add services to the container.
builder.Services.AddScoped<FaqService>();
builder.Services.AddScoped<ConversationService>();

builder.Services.AddControllers();
builder.Services.AddSignalR();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials());
});

var app = builder.Build();

app.UseRouting();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    _ = endpoints.MapControllers();
    _ = endpoints.MapHub<ChatHub>("/chathub");
});

app.Run();
