using HelpAMateAPI.Interfaces;

namespace HelpAMateAPI.Models.DTO.User;

public class UserCreationDto : IDto
{
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Email { get; set; } 
}