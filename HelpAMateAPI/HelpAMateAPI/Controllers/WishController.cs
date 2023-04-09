using HelpAMateAPI.DataBase;
using HelpAMateAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HelpAMateAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class WishController : ControllerBase
{
    private readonly ILogger<WishController> _logger;
    private static List<Wish> Wishes => DataMock.Wishes;
    private readonly DatabaseContext _dbContext;
    

    public WishController(ILogger<WishController> logger, DatabaseContext context)
    {
        _dbContext = context;
        _logger = logger;
    }


    [HttpGet(Name = "GetWishes")]
    public async Task<IActionResult> Get()
    {
        var wishesWithUsers = await _dbContext.Wishes.Include(w => w.User).ToListAsync();

        var result = wishesWithUsers.Select(w => new {
            Id = w.Id,
            Title = w.Title,
            Description = w.Description,
            User = new {
                Id = w.User.Id,
                Email = w.User.Email,
                AvatarUrl = w.User.AvatarUrl
            }
        }).ToList();
        return Ok(result);
    }
    
    [HttpPost]
    public async Task<IActionResult> Create(Wish model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var wish = new Wish
        {
            Description = model.Description
        };

        _dbContext.Wishes?.Add(model);
        await _dbContext.SaveChangesAsync();
        
        return Ok(model);
    }
}

