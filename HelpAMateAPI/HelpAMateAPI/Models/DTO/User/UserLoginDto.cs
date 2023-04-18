using HelpAMateAPI.Interfaces;

namespace HelpAMateAPI.Models.DTO.User;

public class UserLoginDto : IDto
{
    public string? Email { get; set; }
    public string? Password { get; set; }
}