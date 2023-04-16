using HelpAMateAPI.DataBase;
using HelpAMateAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HelpAMateAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly DatabaseContext _dbContext;

    public UserController(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    [HttpGet(Name = "GetUsers")]
    public async Task<IActionResult> List()
    {
        var users = await _dbContext.Users.Include(u => u.Wishes).ToListAsync();
        return Ok(users);
    }

    
    /*
    [HttpPost]
    public async Task<IActionResult> CreateUser(User model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = new User
        {
            Email = model.Email,
            AvatarUrl = model.AvatarUrl,
            Wishes = model.Wishes
        };

        _dbContext.Users?.Add(user);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }
    */

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _dbContext.Users?.Include(u => u.Wishes).FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }
}