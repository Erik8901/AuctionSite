using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class AuctionController : ControllerBase
{
    private readonly AppDbContext _db;

    public AuctionController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IEnumerable<Auction>> Get()
    {
        return await _db.Auctions.ToListAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Create(Auction item)
    {
        _db.Auctions.Add(item);
        await _db.SaveChangesAsync();

        return Ok(item);
    }
}