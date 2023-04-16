
using HelpAMateAPI.Interfaces;

namespace HelpAMateAPI.Models.DTO.User;

public class UserDto : IDto
{
    public int Id { get; set; } 
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Email { get; set; } 
    public string? AvatarUrl { get; set; } 
}