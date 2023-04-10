﻿using System;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace HelpAMateAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Email { get; set; }
		public string? AvatarUrl {get; set;}
        public IEnumerable<Wish> Wishes { get; set; } = new List<Wish>();
    }
}

