using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Peripass.QuestionaryExcercise.Backend.Profiles;
using Peripass.QuestionaryExcercise.Backend.Profiles.Domain;
using Peripass.QuestionaryExcercise.Backend.Visitors.Domain;

namespace Peripass.QuestionaryExcercise.Backend.Visitors.Visitors.Endpoints;

public static class CreateVisitor
{
    public static Results<Ok<CreateVisitorResponse>, BadRequest> Handle(VisitorDbContext visitorDbContext, ProfileDbContext profileDbContext, CreateVisitorRequest request) 
    {
        var profile = profileDbContext.Profiles
            .Include(p => p.Questionary)
            .ThenInclude(q => q.Questions)
            .FirstOrDefault(p => p.Id == request.ProfileId);

        if (profile == null) {
            return TypedResults.BadRequest();
        }
        
        var isQuestionaryValid = profile.IsQuestionaryValid(request.Fields.Select(f => new Profile.QuestionaryAnswer(f.QuestionId, f.Value.ToString())).ToList());

        if (!isQuestionaryValid) {
            return TypedResults.BadRequest();
        }

        var visitor = new Visitor(
            profileId: profile.Id, 
            fields: request.Fields.Select(f => new VisitorField(f.QuestionId, f.Value.ToString())).ToList()
        );
        
        visitorDbContext.Visitors.Add(visitor);
        visitorDbContext.SaveChanges();
        
        return TypedResults.Ok(new CreateVisitorResponse {
            VisitorId = visitor.Id
        });
    }

    public class CreateVisitorRequest
    {
        public List<VisitorField> Fields { get; set; } = new List<VisitorField>();
        public Guid ProfileId { get; set; }

        public class VisitorField
        {
            public Guid QuestionId { get; set; }
            public JsonElement Value { get; set; }
        }
    }

    public class CreateVisitorResponse
    {
        public Guid VisitorId { get; set; }
    }

}
