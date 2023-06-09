﻿using System;

namespace HelpAMateAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Username { get; set; }
		public string? AvatarUrl {get; set;}
        public IEnumerable<Wish> Wishes { get; set; } = new List<Wish>();
    }
}

