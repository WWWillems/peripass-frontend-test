namespace Peripass.QuestionaryExcercise.Backend.Profiles.Domain;

public class NumberQuestion : Question
{
    protected NumberQuestion() : base(string.Empty, QuestionType.Number, default, default, default)
    {
    }
    
    public NumberQuestion(string text, int minValue, int maxValue, int order, bool isIdentificationField, bool isRequired) : base(text, QuestionType.Number, order, isIdentificationField, isRequired)
    {
        MinValue = minValue;
        MaxValue = maxValue;
    }
    
    public int MinValue { get; private set; }
    public int MaxValue { get; private set; }

    public override bool IsValidAnswer(string answer)
    {
        return decimal.TryParse(answer, out var number);
    }
}
