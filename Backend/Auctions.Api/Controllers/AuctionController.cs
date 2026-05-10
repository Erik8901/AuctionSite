using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly AppDbContext _db;

    public TodoController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IEnumerable<TodoItem>> Get()
    {
        return await _db.TodoItems.ToListAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Create(TodoItem item)
    {
        _db.TodoItems.Add(item);
        await _db.SaveChangesAsync();

        return Ok(item);
    }
}