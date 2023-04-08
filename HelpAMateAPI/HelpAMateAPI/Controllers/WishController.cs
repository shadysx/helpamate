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
        return Ok(Wishes);
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

