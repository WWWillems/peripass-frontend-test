using Peripass.QuestionaryExcercise.Backend.Visitors.Visitors.Endpoints;

namespace Peripass.QuestionaryExcercise.Backend.Visitors;

public class VisitorApi 
{
    public RouteGroupBuilder MapRoutes(RouteGroupBuilder routes) {
        routes.MapGet("/", ListVisitors.Handle)
            .WithOpenApi(operation => {
                operation.OperationId = "ListVisitors";
                operation.Summary = "List all visitors";
                operation.Description = "Get a list of all the available visitors";
                return operation;
            });

        routes.MapGet("/{id}", GetVisitorById.Handle)
            .WithOpenApi(operation => {
                operation.OperationId = "GetVisitorById";
                operation.Summary = "Get a visitor by id";
                operation.Description = "Get a visitor by id";
                return operation;
            });

        routes.MapPost("/", CreateVisitor.Handle)
            .WithOpenApi(operation => {
                operation.OperationId = "CreateVisitor";
                operation.Summary = "Create a new visitor";
                operation.Description = "Create a new visitor";
                return operation;
            });

        routes.MapPatch("/{id}", UpdateVisitor.Handle)
            .WithOpenApi(operation => {
                operation.OperationId = "UpdateVisitor";
                operation.Summary = "Update a visitor";
                operation.Description = "Update a visitor";
                return operation;
            });
        
        return routes;
    }
}