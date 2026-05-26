using Auctions.Api.Models;
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
    //public async Task<IEnumerable<Auction>> Get()
    //{
    //    return await _db.Auctions
    //   .Include(a => a.Bids)
    //   .ToListAsync();
    //}

    //public async Task<IEnumerable<Auction>> Get()
    //{
    //    return await _db.Auctions.ToListAsync();
    //}

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var auctions = await _db.Auctions
                .Include(a => a.Bids)
                .ToListAsync();

            return Ok(auctions);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.ToString());
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create(Auction item)
    {
        _db.Auctions.Add(item);
        await _db.SaveChangesAsync();

        return Ok(item);
    }

    [HttpPost("{auctionId}/bid")]
    public async Task<IActionResult> AddBid(int auctionId, [FromBody] CreateBidDto dto)
    {
        var bid = new Bid
        {
            Price = dto.Price,
            Bidder = dto.Bidder,
            CreatedAt = dto.CreatedAt,
            AuctionId = auctionId
        };

        _db.Bids.Add(bid);
        await _db.SaveChangesAsync();

        return Ok(bid);
    }
}