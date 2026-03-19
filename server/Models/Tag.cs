namespace server.Models;

public class Tag
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string Name { get; set; } = string.Empty;
    public int UsageCount { get; set; }

    public ICollection<CourseTag> CourseTags { get; set; } = new List<CourseTag>();
}