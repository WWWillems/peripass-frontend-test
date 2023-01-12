namespace Peripass.QuestionaryExcercise.Backend.Profiles.Domain;

public class Profile
{
    protected Profile()
    {
    }
    
    public Profile(string name, Questionary questionary)
    {
        Name = name;
        Questionary = questionary;
    }

    public record QuestionaryAnswer(Guid QuestionId, string Answer);
    public bool IsQuestionaryValid(IEnumerable<QuestionaryAnswer> answers, IEnumerable<QuestionaryAnswer>? existingAnswers = null)
    {
        // Avoid multiple enumerations
        var answerList = answers.ToList();

        // Is there an answer for all required questions?
        // Either the answer is new or it already exists
        var requiredQuestions = Questionary.Questions.Where(q => q.IsRequired);
        var allAnswers = answerList.UnionBy(existingAnswers ?? Enumerable.Empty<QuestionaryAnswer>(), a => a.QuestionId).ToList();
        var areRequiredQuestionsAnswered = requiredQuestions.All(q => allAnswers.Any(a => a.QuestionId == q.Id));

        // Are all answers part of the questionary?
        var areAllAnswersValid = answerList.All(a => Questionary.Questions.Any(q => q.Id == a.QuestionId));

        // Are all answers valid?
        var areAllAnswersValidForQuestion = answerList.All(a => Questionary.Questions
            .FirstOrDefault(q => q.Id == a.QuestionId)
            ?.IsValidAnswer(a.Answer) ?? false);

        return areRequiredQuestionsAnswered && areAllAnswersValid && areAllAnswersValidForQuestion;
    }

    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Name { get; private set; } = string.Empty;
    public Questionary Questionary { get; private set; }
}
