using System.Collections.Generic;
using HelpAMateAPI.Interfaces;
using HelpAMateAPI.Models.DTO.User;
using HelpAMateAPI.Models.DTO.WishPicture;

namespace HelpAMateAPI.Models.DTO.Wish;

public class WishDto : IDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public UserDto? User { get; set; }
    public IEnumerable<WishPictureDto>? WishPictures {get; set; }
    
}
