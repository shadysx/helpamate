using HelpAMateAPI.Models.DTO.WishPicture;

namespace HelpAMateAPI.Models.DTO.Wish;

public class WishCreationDto
{
    public string? Title {get; set;}
    public string? Description {get; set;}
    public int UserId { get; set; }
    public ICollection<WishPictureDto>? WishPictures { get; set; }
}