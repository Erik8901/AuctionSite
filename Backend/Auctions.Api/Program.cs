using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));



builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend",
        p => p.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowAnyOrigin());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    var auctions = await context.Auctions.ToListAsync();

    foreach (var auction in auctions)
    {
        Console.WriteLine(
            $"Id: {auction.Id}, Title: {auction.Title}, Price: {auction.Price}, Done: {auction.IsDone} , Description: {auction.Description}, StartDate: {auction.StartDate}, EndDate: {auction.EndDate}, CreatedBy: {auction.CreatedBy}\"" );
    }
}

app.UseCors("frontend");

// 🔥 IMPORTANT: enable default files (index.html)
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.MapControllers();

app.Run();