namespace Peripass.QuestionaryExcercise.Backend.Profiles.Domain;

public class TextQuestion : Question
{
    protected TextQuestion() : base(string.Empty, QuestionType.Text, default, default, default)
    {
    }
    public TextQuestion(string text, int minLength, int maxLength, int order, bool isIdentificationField, bool isRequired) : base(text, QuestionType.Text, order, isIdentificationField, isRequired)
    {
        MinLength = minLength;
        MaxLength = maxLength;
    }

    public int MinLength { get; private set; }
    public int MaxLength { get; private set; }

    public override bool IsValidAnswer(string answer)
    {
        return true;
    }
}
