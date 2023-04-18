using HelpAMateAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HelpAMateAPI.DataBase;

public class DatabaseContext: DbContext
{

    
    public DatabaseContext() {}
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(@"Server=localhost;Database=helpamate;Port=5432;User Id=postgres;Password=toor");
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

    }
    
    public DbSet<Wish>? Wishes { get; set; }
    public DbSet<User>? Users { get; set; }
    public DbSet<WishPicture>? WishPictures { get; set; }
}