namespace Peripass.QuestionaryExcercise.Backend.Visitors.Domain;

public class VisitorField
{
    protected VisitorField()
    {
        Value = string.Empty;
    }

    public VisitorField(Guid questionId, string value)
    {
        Id = Guid.NewGuid();
        QuestionId = questionId;
        Value = value;
    }

    public Guid Id { get; private set; }
    public Guid QuestionId { get; private set; }
    public string Value { get; private set; }

    public void UpdateValue(string value)
    {
        Value = value;
    }
}