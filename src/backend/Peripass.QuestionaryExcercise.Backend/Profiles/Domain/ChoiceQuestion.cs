namespace Peripass.QuestionaryExcercise.Backend.Profiles.Domain;

public class ChoiceQuestion : Question
{
    protected ChoiceQuestion() : base(string.Empty, QuestionType.Choice, default, default, default)
    {
    }

    public ChoiceQuestion(string text, IEnumerable<string> choices, int order, bool isIdentificationField, bool isRequired) : base(text, QuestionType.Choice, order, isIdentificationField, isRequired)
    {
        Choices = choices.ToList();
    }
    
    public List<string> Choices { get; private set; } = new List<string>();

    public override bool IsValidAnswer(string answer)
    {
        return Choices.Contains(answer);
    }
}