using Auctions.Api.Models;
using Auctions.Api.Dtos;
using Auctions.Api.Services;

using Microsoft.AspNetCore.Mvc;

namespace AuthApi.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private static List<User> users = new();

    private readonly JwtService _jwtService;

    public AuthController(JwtService jwtService)
    {
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterRequest request)
    {
        var user = new User
        {
            Id = users.Count + 1,
            Email = request.Email,
            PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        users.Add(user);
        foreach (var person in users)
        {
            Console.WriteLine(
                $"User: {person.Email}");
        }

        var token = _jwtService.Generate(user);

        return Ok(new
        {
            token
        });
    }

    [HttpPost("login")]
    public IActionResult Login(LoginRequest request)
    {
        var user = users.FirstOrDefault(
            u => u.Email == request.Email
        );

        if (user == null)
            return Unauthorized();

        bool validPassword =
            BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.PasswordHash
            );

        if (!validPassword)
            return Unauthorized();

        var token = _jwtService.Generate(user);

        return Ok(new
        {
            token
        });
    }
}