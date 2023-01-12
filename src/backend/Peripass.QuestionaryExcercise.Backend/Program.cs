using Microsoft.EntityFrameworkCore;
using Peripass.QuestionaryExcercise.Backend.Profiles;
using Peripass.QuestionaryExcercise.Backend.Visitors;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS
const string CorsAllowAll = "AllowAll";
builder.Services.AddCors(options => {
    options.AddPolicy(CorsAllowAll, builder => {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Configure Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.CustomSchemaIds(type => {
        return type.FullName!.Replace("+", "_");
    });

});

// Configure database
builder.Services.AddDbContext<ProfileDbContext>(options => options.UseSqlite("Data Source=questionaryexcercise.db"));
builder.Services.AddDbContext<VisitorDbContext>(options => options.UseSqlite("Data Source=visitors.db"));

//-----------

var app = builder.Build();

// Ensure the database is created
using (var scope = app.Services.CreateScope())
{
    var profileDbContext = scope.ServiceProvider.GetRequiredService<ProfileDbContext>();
    profileDbContext.Database.EnsureCreated();
    await ProfilesDbSeeder.SeedAsync(profileDbContext);

    var visitorDbContext = scope.ServiceProvider.GetRequiredService<VisitorDbContext>();
    visitorDbContext.Database.EnsureCreated();
}

// Register CORS
app.UseCors();

// Register Swagger
app.UseSwagger();
app.UseSwaggerUI();
app.MapGet("/", () => TypedResults.Redirect("/swagger/index.html")).ExcludeFromDescription();

// Register API
var profileApi = new ProfileApi();
var profileApiGroup = app.MapGroup("profiles").WithTags("Profiles").RequireCors(CorsAllowAll);
profileApi.MapRoutes(profileApiGroup);

var visitorApi = new VisitorApi();
var visitorApiGroup = app.MapGroup("visitors").WithTags("Visitors").RequireCors(CorsAllowAll);
visitorApi.MapRoutes(visitorApiGroup);

// Run the app
app.Run();
