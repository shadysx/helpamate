using HelpAMateAPI.DataBase;
using HelpAMateAPI.Interfaces;
using HelpAMateAPI.Models;
using HelpAMateAPI.Models.DTO.User;
using HelpAMateAPI.Models.DTO.Wish;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HelpAMateAPI.Controllers;

[ApiController]
[Route("Wishes")]
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
        
        var response = wishesWithUsers.Select(w => new WishDto(){
            Id = w.Id,
            Title = w.Title,
            Description = w.Description,
            User = new UserDto(){
                Id = w.User.Id,
                Email = w.User.Email,
                AvatarUrl = w.User.AvatarUrl
            }
        }).ToList();

        return Ok(response);
    }
    
    [HttpGet("{id}", Name = "GetByWishId")]
    public async Task<ActionResult<Wish>> GetByWishId(int id)
    {
        var wish = await _dbContext.Wishes.Include(w => w.User).FirstOrDefaultAsync(w => w.Id == id);
        
        if (wish == null)
        {
            return NotFound();
        }

        var response = new WishDto()
        {
            Id = wish.Id,
            Title = wish.Title,
            Description = wish.Description,
            User = new UserDto()
            {
                Id = wish.User.Id,
                Email = wish.User.Email,
                AvatarUrl = wish.User.AvatarUrl
            }
        };

        return Ok(response);
    }
    
    
    
    [HttpPost]
    public async Task<IActionResult> Create(WishCreationDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var wish = new Wish
        {
            Title = model.Title,
            Description = model.Description,
            UserId = model.UserId    
        };

        _dbContext.Wishes?.Add(wish);
        await _dbContext.SaveChangesAsync();
        
        return Ok(model);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, WishUpdateDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var wish = await _dbContext.Wishes.Include(w => w.User).FirstOrDefaultAsync(w => w.Id == id);

        if (wish == null)
        {
            return NotFound();
        }

        wish.Title = model.Title;
        wish.Description = model.Description;

        await _dbContext.SaveChangesAsync();

        var response = new WishDto()
        {
            Id = wish.Id,
            Description = wish.Description,
            Title = wish.Title,
            User = new UserDto()
            {
                Id = wish.User.Id,
                Email = wish.User.Email,
                AvatarUrl = wish.User.AvatarUrl
            }
        };

        return Ok(response);
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var wish = await _dbContext.Wishes.FindAsync(id);

        if (wish == null)
        {
            return NotFound();
        }

        _dbContext.Wishes.Remove(wish);
        await _dbContext.SaveChangesAsync();

        return Ok($"Deleted wish with id:{id} success");
    }
}

