using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HelpAMateAPI.DataBase;
using HelpAMateAPI.Interfaces;
using HelpAMateAPI.Models;
using HelpAMateAPI.Models.DTO.User;
using HelpAMateAPI.Models.DTO.Wish;
using HelpAMateAPI.Models.DTO.WishPicture;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

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
    public async Task<ApiResponse> Get()
    {
        var test = await _dbContext.WishPictures.ToListAsync();
        var wishesWithUsers = await _dbContext.Wishes
            .Include(w => w.User)
            .Include(w => w.WishPictures)
            .ToListAsync();

        
        
        var response = wishesWithUsers.Select(w => new WishDto(){
            Id = w.Id,
            Title = w.Title,
            Description = w.Description,
            WishPictures = w.WishPictures.Select(wp => new WishPictureDto()
            {
                Id = wp.Id,
                PictureUrl = wp.PictureUrl
            }).ToList(),
            User = new UserDto(){
                Id = w.User.Id,
                Username = w.User.Username,
                Email = w.User.Email,
                AvatarUrl = w.User.AvatarUrl
            }
        }).ToList();

        return new ApiResponse("Fetching with success", response);
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
                Username = wish.User.Username,
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

        var wishPictures = model.WishPictures.Select(wishPicture => new WishPicture
        {
            PictureUrl = wishPicture.PictureUrl
            // Map other properties from WishPictureCreationDto to WishPicture as needed
        }).ToList();
        var wish = new Wish
        {
            Title = model.Title,
            Description = model.Description,
            UserId = model.UserId,
            WishPictures = wishPictures
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

