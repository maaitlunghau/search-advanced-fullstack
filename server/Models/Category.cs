namespace server.Models;

public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string IconUrl { get; set; } = string.Empty;

    public ICollection<Course> Courses { get; set; } = new List<Course>();
}