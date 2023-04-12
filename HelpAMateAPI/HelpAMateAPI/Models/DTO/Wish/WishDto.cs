using HelpAMateAPI.Interfaces;
using HelpAMateAPI.Models.DTO.User;

namespace HelpAMateAPI.Models.DTO.Wish;

public class WishDto : IDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public UserDto? User { get; set; }
}
