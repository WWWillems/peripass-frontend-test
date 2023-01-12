using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Peripass.QuestionaryExcercise.Backend.Profiles.Domain;

namespace Peripass.QuestionaryExcercise.Backend.Profiles;

public class ProfileDbContext : DbContext
{
    public ProfileDbContext(DbContextOptions<ProfileDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Profile>()
            .HasOne(p => p.Questionary);

        modelBuilder.Entity<Questionary>()
            .HasMany(q => q.Questions);

        modelBuilder.Entity<Question>()
            .HasDiscriminator<QuestionType>("Type")
            .HasValue<TextQuestion>(QuestionType.Text)
            .HasValue<NumberQuestion>(QuestionType.Number)
            .HasValue<ChoiceQuestion>(QuestionType.Choice);

        var choicesSerializer = new JsonSerializerOptions();
        modelBuilder.Entity<ChoiceQuestion>()
            .Property(cq => cq.Choices)
            .HasConversion(
                v => JsonSerializer.Serialize(v, choicesSerializer), 
                v => JsonSerializer.Deserialize<List<string>>(v, choicesSerializer) ?? new List<string>());
    }

    public DbSet<Profile> Profiles { get; set; } = null!;
}