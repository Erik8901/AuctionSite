using Microsoft.EntityFrameworkCore;
using System.Text;
using Auctions.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;


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

builder.Services.AddSingleton<JwtService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = Encoding.UTF8.GetBytes(
            builder.Configuration["Jwt:Key"]
        );

        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey =
                    new SymmetricSecurityKey(key),

                ValidateIssuer = false,
                ValidateAudience = false
            };
    });

builder.Services.AddAuthorization();

builder.Services.AddHttpClient<TranslationService>(
    client =>
    {
        client.BaseAddress = new Uri(
            "https://api-free.deepl.com/"
        );
    }
);



var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    var auctions = await context.Auctions.ToListAsync();

    //foreach (var auction in auctions)
    //{
    //    Console.WriteLine(
    //        $"Id: {auction.Id}, Title: {auction.Title}, Price: {auction.Price}, Done: {auction.IsDone} , Description: {auction.Description}, StartDate: {auction.StartDate}, EndDate: {auction.EndDate}, CreatedBy: {auction.CreatedBy}\"");
    //}


}



app.UseCors("frontend");

// 🔥 IMPORTANT: enable default files (index.html)
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();


app.MapControllers();

app.Run();