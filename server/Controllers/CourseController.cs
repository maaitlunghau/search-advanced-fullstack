using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class CourseController : ControllerBase
{
    private readonly DataContext _dbContext;

    public CourseController(DataContext dbContext)
        => _dbContext = dbContext;

    [HttpGet]
    public async Task<IActionResult> GetAllCourse()
    {
        try
        {
            var courses = await _dbContext.Courses.AsNoTracking().ToListAsync();
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
            var singleCourse = await _dbContext.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
            return Ok(singleCourse);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedCourses([FromQuery] int limit = 3)
    {
        try
        {
            var featuredCourses = await _dbContext.Courses
                .AsNoTracking()
                .OrderByDescending(c => c.TotalStudents)
                .Take(limit)
                .ToListAsync();

            return Ok(featuredCourses);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchCourses(
        [FromQuery] string? q,
        [FromQuery] Guid? categoryId,
        [FromQuery] string? level,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10
    )
    {
        try
        {
            var query = _dbContext.Courses.AsNoTracking().AsQueryable();

            if (!string.IsNullOrEmpty(q))
            {
                var lowerQuery = q.ToLower();
                query = query.Where(c => c.Title.ToLower().Contains(lowerQuery) || c.Description.ToLower().Contains(lowerQuery));

                // Log the valid search query
                _dbContext.SearchLogs.Add(new SearchLog
                {
                    Query = q!
                });
                await _dbContext.SaveChangesAsync();
            }

            if (categoryId.HasValue)
            {
                query = query.Where(c => c.CategoryId == categoryId);
            }

            if (!string.IsNullOrEmpty(level))
            {
                query = query.Where(c => c.Level.ToLower() == level.ToLower());
            }

            var results = await query
                .OrderByDescending(c => c.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(results);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}