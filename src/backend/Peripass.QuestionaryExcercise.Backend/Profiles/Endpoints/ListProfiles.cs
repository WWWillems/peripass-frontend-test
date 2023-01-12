using Microsoft.AspNetCore.Http.HttpResults;

namespace Peripass.QuestionaryExcercise.Backend.Profiles;

public static class ListProfiles
{
    public static Ok<ListProfilesResponse> Handle(ProfileDbContext dbContext) {
        var profiles = dbContext.Profiles
            .Select(p => new ProfileListItem {
                Id = p.Id,
                Name = p.Name
            })
            .ToList();

        return TypedResults.Ok(new ListProfilesResponse {
            Profiles = profiles
        });
    }

    public class ListProfilesResponse
    {
        public List<ProfileListItem> Profiles { get; set; } = new List<ProfileListItem>();
    }

    public class ProfileListItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
