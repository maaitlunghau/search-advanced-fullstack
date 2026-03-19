using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class CourseControlle : ControllerBase
{
    private readonly DataContext _dbContext;

    public CourseControlle(DataContext dbContext)
        => _dbContext = dbContext;

    [HttpGet]
    public async Task<IActionResult> GetAllCourse()
    {
        try
        {
            var courses = await _dbContext.Courses.ToListAsync();
            return Ok(courses);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("{id:Guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        try
        {
            var singleCourse = await _dbContext.Courses.FindAsync(id);
            return Ok(singleCourse);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("suggestions")]
    public async Task<IActionResult> GetSuggestions([FromQuery] string q, [FromQuery] int limit = 5)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(q))
            {
                return Ok(new
                {
                    Keywords = new List<string>(),
                    Courses = new List<object>()
                });
            }

            string lowerQuery = q.ToLower();

            var keywords = await _dbContext.SearchLogs
                .Where(sl => sl.Query.ToLower().Contains(lowerQuery))
                .GroupBy(sl => sl.Query)
                .OrderByDescending(g => g.Count())
                .Take(5)
                .Select(g => g.Key)
                .ToListAsync();

            var courses = await _dbContext.Courses
                .Where(c => c.Title.ToLower().Contains(lowerQuery) ||
                    c.Description.ToLower().Contains(lowerQuery))
                .OrderByDescending(c => c.TotalStudents)
                .Take(limit)
                .ToListAsync();

            return Ok(new
            {
                Keywords = keywords,
                Courses = courses
            });

        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("search")]
    public IActionResult SearchCourses(
    )
    {
        try
        {
            return Ok("Search");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}