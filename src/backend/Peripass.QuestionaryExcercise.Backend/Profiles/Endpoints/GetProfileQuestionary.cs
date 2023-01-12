using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Peripass.QuestionaryExcercise.Backend.Profiles.Domain;

namespace Peripass.QuestionaryExcercise.Backend.Profiles;

public static class GetProfileQuestionary
{
    public static Results<Ok<GetProfileQuestionaryResponse>, NotFound> Handle(ProfileDbContext dbContext, Guid profileId) {
        var profile = dbContext.Profiles
            .Include(p => p.Questionary)
            .ThenInclude(q => q.Questions)
            .FirstOrDefault(p => p.Id == profileId);

        if (profile == null) {
            return TypedResults.NotFound();
        }

        var questionary = profile.Questionary;

        var response = new GetProfileQuestionaryResponse {
            ProfileId = profile.Id,
            ProfileName = profile.Name,
            Questions = questionary.Questions.Select(q => new QuestionListItem {
                Id = q.Id,
                Text = q.Text,
                Type = q.Type.ToString(),
                IsIdentificationField = q.IsIdentificationField,
                IsRequired = q.IsRequired,
                Properties = GetQuestionSpecificProperties(q)
            }).ToList()
        };

        return TypedResults.Ok(response);
    }

    private static Dictionary<string, object> GetQuestionSpecificProperties(Question question) => question switch {
        ChoiceQuestion choiceQuestion => new Dictionary<string, object> {
            { "choices", choiceQuestion.Choices }
        },
        _ => new Dictionary<string, object>()
    };

    public class GetProfileQuestionaryResponse
    {
        public Guid ProfileId { get; set; }
        public string ProfileName { get; set; } = string.Empty;
        public List<QuestionListItem> Questions { get; set; } = new List<QuestionListItem>();
    }

    public class QuestionListItem
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Text { get; set; } = string.Empty;
        public bool IsIdentificationField { get; set; }
        public bool IsRequired { get; set; }

        [JsonExtensionData]
        public Dictionary<string, object> Properties { get; set; } = new Dictionary<string, object>();
    }
}