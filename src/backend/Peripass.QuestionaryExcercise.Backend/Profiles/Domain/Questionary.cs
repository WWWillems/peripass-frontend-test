namespace Peripass.QuestionaryExcercise.Backend.Profiles.Domain;

public class Questionary
{
    private List<Question> questions = new List<Question>();

    protected Questionary()
    {
    }

    public Questionary(List<Question> questions)
    {
        Questions = questions;
    }

    public Guid Id { get; private set; } = Guid.NewGuid();
    public List<Question> Questions 
    { 
        get => new List<Question>(questions.OrderBy(q => q.Order)); 
        private set => questions = new List<Question>(value.OrderBy(q => q.Order)); 
    }
}
