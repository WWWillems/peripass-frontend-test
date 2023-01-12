using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Peripass.QuestionaryExcercise.Backend.Profiles;
using Peripass.QuestionaryExcercise.Backend.Profiles.Domain;
using Peripass.QuestionaryExcercise.Backend.Visitors.Domain;

namespace Peripass.QuestionaryExcercise.Backend.Visitors.Visitors.Endpoints;

public static class UpdateVisitor 
{
    public static async Task<Results<Ok<UpdateVisitorResponse>, BadRequest, NotFound>> Handle(
        VisitorDbContext visitorDbContext, 
        ProfileDbContext profileDbContext, 
        Guid id,
        UpdateVisitorRequest request) 
    {
        var visitor = await visitorDbContext.Visitors
            .Include(v => v.Fields)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (visitor == null) {
            return TypedResults.NotFound();
        }

        var profileId = request.ProfileId ?? visitor.ProfileId;

        var profile = await profileDbContext.Profiles
            .Include(p => p.Questionary)
            .ThenInclude(q => q.Questions)
            .FirstOrDefaultAsync(p => p.Id == profileId);

        if (profile == null) {
            return TypedResults.BadRequest();
        }
        
        var isQuestionaryValid = profile.IsQuestionaryValid(
            answers: request.Fields.Select(f => new Profile.QuestionaryAnswer(f.QuestionId, f.Value.ToString())),
            existingAnswers: visitor.Fields.Select(f => new Profile.QuestionaryAnswer(f.QuestionId, f.Value))
        );

        if (!isQuestionaryValid) {
            return TypedResults.BadRequest();
        }

        visitor.UpdateFields(request.Fields.Select(f => new VisitorField(f.QuestionId, f.Value.ToString())).ToList());
        
        await visitorDbContext.SaveChangesAsync();
        
        return TypedResults.Ok(new UpdateVisitorResponse {
            VisitorId = visitor.Id
        });
    }

    public class UpdateVisitorRequest
    {
        public List<VisitorField> Fields { get; set; } = new List<VisitorField>();
        public Guid? ProfileId { get; set; }

        public class VisitorField
        {
            public Guid QuestionId { get; set; }
            public JsonElement Value { get; set; }
        }
    }

    public class UpdateVisitorResponse
    {
        public Guid VisitorId { get; set; }
    }

}
