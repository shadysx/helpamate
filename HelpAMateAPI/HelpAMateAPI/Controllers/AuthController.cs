using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using HelpAMateAPI.DataBase;
using HelpAMateAPI.Models;
using HelpAMateAPI.Models.DTO.User;
using HelpAMateAPI.Models.DTO.Wish;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        var existingUser = _dbContext.Users.Include(u => u.Wishes).FirstOrDefault(u => u.Email == request.Email);
        
        if (existingUser == null)
        {
            return BadRequest("User not found");
        }

        if (!VerifyPasswordHash(request.Password, existingUser.PasswordHash, existingUser.PasswordSalt))
        {
            return BadRequest("Wrong password");
        }

        UserDto user = new UserDto()
        {
            Email = existingUser.Email,
            Username = existingUser.Username,
            AvatarUrl = existingUser.AvatarUrl,
            Wishes = existingUser.Wishes.Select(wish => new WishDto()
            {
                Id = wish.Id,
                Title = wish.Title,
                Description = wish.Description
            })
        };
 

        string token = CreateToken(existingUser);
        return Ok(new {jwt = token, user});
    }
    
    private string CreateToken(User user)
    {
        List<Claim> claims = new()
        {
            new Claim(ClaimTypes.Name, user.Username),
        };

        var key = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
        
        

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddHours(1),
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