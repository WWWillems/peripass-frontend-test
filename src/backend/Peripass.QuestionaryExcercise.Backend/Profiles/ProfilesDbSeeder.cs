using Peripass.QuestionaryExcercise.Backend.Profiles.Domain;
using Microsoft.EntityFrameworkCore;

namespace Peripass.QuestionaryExcercise.Backend.Profiles;

public static class ProfilesDbSeeder
{
    public static async Task SeedAsync(ProfileDbContext dbContext)
    {
        if (await dbContext.Profiles.AnyAsync())
        {
            return;
        }

        var profiles = new List<Profile>
        {
            new Profile("Loading", new Questionary(new List<Question>
            {
                new TextQuestion("What is your shipment number?", 1, 100, 1, true, true),
                new NumberQuestion("How many packages are there?", 1, 100, 2, false, true),
                new TextQuestion("What is the name of the shipper?", 1, 100, 3, false, true),
                new ChoiceQuestion("What is the type of the shipment?", new List<string>
                {
                    "Documents",
                    "Food",
                    "Electronics",
                    "Clothes",
                    "Other"
                }, 4, false, false),
            })),
            new Profile("Unloading", new Questionary(new List<Question>
            {
                new TextQuestion("What is your PO number?", 1, 100, 1, false, true),
                new NumberQuestion("How many packages are there?", 1, 100, 2, false, true),
                new TextQuestion("What is the name of the receiver?", 1, 100, 3, false, true),
                new ChoiceQuestion("What is the type of the shipment?", new List<string>
                {
                    "Documents",
                    "Food",
                    "Electronics",
                    "Clothes",
                    "Other"
                }, 4, false, false),
                new ChoiceQuestion("Are there any dangerous goods?", new List<string>
                {
                    "Yes",
                    "No"
                }, 5, false, true),
            }))
        };

        await dbContext.Profiles.AddRangeAsync(profiles);

        await dbContext.SaveChangesAsync();
    }
}
