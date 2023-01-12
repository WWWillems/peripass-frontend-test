using Microsoft.EntityFrameworkCore;
using Peripass.QuestionaryExcercise.Backend.Visitors.Domain;

namespace Peripass.QuestionaryExcercise.Backend.Visitors;

public class VisitorDbContext : DbContext
{
    public VisitorDbContext(DbContextOptions<VisitorDbContext> options) : base(options)
    {
    }

    public DbSet<Visitor> Visitors { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Visitor>().HasMany(v => v.Fields);

        modelBuilder.Entity<VisitorField>()
            .Property(vf => vf.QuestionId).IsRequired();
    }
}