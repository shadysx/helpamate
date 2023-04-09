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
        modelBuilder.Entity<User>()
            .HasMany(u => u.Wishes)
            .WithOne(w => w.User)
            .HasForeignKey(w => w.UserId);
        
        modelBuilder.Entity<Wish>()
            .HasOne(w => w.User)
            .WithMany(u => u.Wishes)
            .HasForeignKey(w => w.UserId);
    }
    
    public DbSet<Wish>? Wishes { get; set; }
    public DbSet<User>? Users { get; set; }
}