using HelpAMateAPI.Interfaces;

namespace HelpAMateAPI.Models.DTO.User;

public class UserLoginDto : IDto
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}