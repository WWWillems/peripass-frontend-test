using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Peripass.QuestionaryExcercise.Backend.Visitors.Visitors.Endpoints;

public static class GetVisitorById 
{
    public static async Task<Results<Ok<GetVisitorByIdResponse>, NotFound>> Handle(
        VisitorDbContext visitorDbContext,
        Guid id)
    {
        var visitor = await visitorDbContext.Visitors
            .Include(v => v.Fields)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (visitor == null) {
            return TypedResults.NotFound();
        }

        return TypedResults.Ok(new GetVisitorByIdResponse {
            Id = visitor.Id,
            ProfileId = visitor.ProfileId,
            Fields = visitor.Fields.Select(f => new GetVisitorByIdResponse.VisitorField {
                QuestionId = f.QuestionId,
                Value = f.Value
            }).ToList()
        });
    }

    public class GetVisitorByIdResponse
    {
        public Guid Id { get; set; }
        public Guid ProfileId { get; set; }
        public List<VisitorField> Fields { get; set; } = new List<VisitorField>();

        public class VisitorField
        {
            public Guid QuestionId { get; set; }
            public string Value { get; set; } = string.Empty;
        }
    }
}