namespace Peripass.QuestionaryExcercise.Backend.Profiles;


public class ProfileApi
{
    public RouteGroupBuilder MapRoutes(RouteGroupBuilder routes) {
        routes.MapGet("/", ListProfiles.Handle)
            .WithOpenApi(operation => {
                operation.OperationId = "ListProfiles";
                operation.Summary = "List all profiles";
                operation.Description = "Get a list of all the available profiles";
                return operation;
            });

        routes.MapGet("/{id}/questionary", GetProfileQuestionary.Handle)
            .WithOpenApi(operation => {
                operation.OperationId = "GetProfileQuestionary";
                operation.Summary = "Get the questionary for a profile";
                operation.Description = "Get the questionary for a profile";
                return operation;
            });

        return routes;
    }
}
