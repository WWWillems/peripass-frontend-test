using System.Linq.Expressions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Peripass.QuestionaryExcercise.Backend.Visitors.Domain;

namespace Peripass.QuestionaryExcercise.Backend.Visitors.Visitors.Endpoints;

public static class ListVisitors
{
    public static async Task<Results<Ok<ListVisitorsResponse>, BadRequest>> Handle(
        VisitorDbContext visitorDbContext,
        [FromQuery] string fieldFilter = "") 
    {
        // parse filter, format: "423ad6c8-a705-4178-b6e4-aa582cd1548f eq 'value1' and 423ad6c8-a705-4178-b6e4-aa582cd1548f eq 'value2'"
        var filterParts = fieldFilter.Split(" and ", StringSplitOptions.RemoveEmptyEntries);

        var filterExpression = GetFieldFilterExpressions(fieldFilter);

        var visitors = await visitorDbContext.Visitors
            .Include(v => v.Fields)
            .Where(filterExpression)
            .ToListAsync();

        return TypedResults.Ok(new ListVisitorsResponse {
            Visitors = visitors.Select(v => new ListVisitorsResponse.Visitor {
                Id = v.Id,
                ProfileId = v.ProfileId,
                Fields = v.Fields.Select(f => new ListVisitorsResponse.Visitor.VisitorField {
                    QuestionId = f.QuestionId,
                    Value = f.Value
                }).ToList()
            }).ToList()
        });
    }

    private static Expression<Func<Visitor, bool>> GetFieldFilterExpressions(string filter)
    {
        // parse filter, format: "fieldId1 eq 'value1' and fieldId2 eq 'value2'"
        // where fieldId1 and fieldId2 are the ids of the fields in the visitor table
        var filterParts = filter.Split(" and ", StringSplitOptions.RemoveEmptyEntries);

        var fieldFilterExpressions = new List<Expression<Func<Visitor, bool>>>();

        foreach (var filterPart in filterParts)
        {
            var filterPartParts = filterPart.Split(" ", StringSplitOptions.RemoveEmptyEntries);

            if (filterPartParts.Length != 3)
            {
                return visitor => false;
            }

            var fieldId = Guid.Parse(filterPartParts[0]);
            var filterOperator = filterPartParts[1];
            var value = filterPartParts[2].Trim('\'');

            fieldFilterExpressions.Add(filterOperator switch {
                "eq" => visitor => visitor.Fields.Any(f => f.QuestionId == fieldId && f.Value == value),
                "ne" => visitor => visitor.Fields.Any(f => f.QuestionId == fieldId && f.Value != value),
                _ => visitor => false
            });
        }

        if (fieldFilterExpressions.Count == 0) {
            return visitor => true;
        }

        if (fieldFilterExpressions.Count == 1) {
            return fieldFilterExpressions[0];
        }

        return fieldFilterExpressions.Aggregate((f1, f2) => Expression.Lambda<Func<Visitor, bool>>(
            Expression.AndAlso(f1.Body, f2.Body),
            f1.Parameters.Single()));
    }

    public class ListVisitorsResponse
    {
        public List<Visitor> Visitors { get; set; } = new List<Visitor>();

        public class Visitor
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
}
