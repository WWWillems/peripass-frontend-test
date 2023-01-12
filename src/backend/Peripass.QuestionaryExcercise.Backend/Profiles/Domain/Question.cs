namespace Peripass.QuestionaryExcercise.Backend.Profiles.Domain;

public abstract class Question
{
    protected Question(string text, QuestionType type, int order, bool isIdentificationField, bool isRequired)
    {
        Id = Guid.NewGuid();
        Text = text;
        Type = type;
        Order = order;
        IsIdentificationField = isIdentificationField;
        IsRequired = isRequired;
    }

    public Guid Id { get; private set; }
    public string Text { get; private set; } = string.Empty;
    public QuestionType Type { get; private set; }
    public int Order { get; private set; }
    public bool IsIdentificationField { get; private set; }
    public bool IsRequired { get; private set; }

    public abstract bool IsValidAnswer(string answer);
}
