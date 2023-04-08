using System;
namespace HelpAMateAPI.Models
{
	public class Wish
	{
		public int Id {get; set;}
		public string? Title {get; set;}
		public string? Description {get; set;}
		public int UserId { get; set; }
		public User? User { get; set; }
    }

}

