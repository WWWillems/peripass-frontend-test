namespace Peripass.QuestionaryExcercise.Backend.Visitors.Domain;

public class Visitor 
{
    protected Visitor() 
    {
        Fields = new List<VisitorField>();
    }

    public Visitor(Guid profileId, List<VisitorField> fields)
    {
        Id = Guid.NewGuid();
        Fields = fields;
        ProfileId = profileId;
    }

    public Guid Id { get; private set; }
    public Guid ProfileId { get; private set; }
    public List<VisitorField> Fields { get; private set; }

    public void UpdateFields(List<VisitorField> fieldsToUpdate)
    {
        foreach (var field in fieldsToUpdate) {
            var existingField = Fields.FirstOrDefault(f => f.QuestionId == field.QuestionId);
            if (existingField != null) {
                existingField.UpdateValue(field.Value);
            }
            else {
                Fields.Add(field);
            }
        }
    }
}
