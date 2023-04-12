
using HelpAMateAPI.Interfaces;

namespace HelpAMateAPI.Models.DTO.User;

public class UserDto : IDto
{
    public int Id { get; set; } 
    public string? Email { get; set; } 
    public string? AvatarUrl { get; set; } 
}