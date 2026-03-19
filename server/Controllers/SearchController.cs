using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class SearchController : ControllerBase
{
    private readonly DataContext _dbContext;

    public SearchController(DataContext dbContext)
        => _dbContext = dbContext;

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

            // 1. Keyword Suggestions (from history)
            var keywords = await _dbContext.SearchLogs
                .AsNoTracking()
                .Where(sl => sl.Query.ToLower().Contains(lowerQuery))
                .GroupBy(sl => sl.Query)
                .OrderByDescending(g => g.Count())
                .Take(5)
                .Select(g => g.Key)
                .ToListAsync();

            // 2. Item Suggestions (mini results)
            var courses = await _dbContext.Courses
                .AsNoTracking()
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

    [HttpGet("hot-searches")]
    public async Task<IActionResult> GetHotSearches()
    {
        try
        {
            var hotSearches = await _dbContext.SearchLogs
                .AsNoTracking()
                .GroupBy(sl => sl.Query)
                .OrderByDescending(g => g.Count())
                .Take(6)
                .Select(g => g.Key)
                .ToListAsync();

            return Ok(hotSearches);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}
