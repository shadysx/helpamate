using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using HelpAMateAPI.DataBase;
using HelpAMateAPI.Models;
using HelpAMateAPI.Models.DTO.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace HelpAMateAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly DatabaseContext _dbContext;
    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration, DatabaseContext dbContext)
    {
        _configuration = configuration;
        _dbContext = dbContext;
    }
    
    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(UserCreationDto request)
    {
        
        // Check if exist
        var existingUser = _dbContext.Users.FirstOrDefault(u => u.Email == request.Email || u.Username == request.Username);
        if (existingUser != null)
        {
            return BadRequest("Email or username already in use");
        }
        
        // Create user
        User user = new();
        CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
        
        user.Username = request.Username;
        user.Email = request.Email;
        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(UserLoginDto request)
    {
        
        // Check if exist
        var existingUser = _dbContext.Users.FirstOrDefault(u => u.Username == request.Username);
        
        if (existingUser == null)
        {
            return BadRequest("User not found");
        }

        if (!VerifyPasswordHash(request.Password, existingUser.PasswordHash, existingUser.PasswordSalt))
        {
            return BadRequest("Wrong password");
        }

        string token = CreateToken(existingUser);
        return Ok(new {jwt = token});
    }

    private string CreateToken(User user)
    {
        List<Claim> claims = new()
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
        };

        var key = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds);

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
    
    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512(passwordSalt))
        {
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }
    }
    
    
}