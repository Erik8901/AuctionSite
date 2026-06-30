using Auctions.Api.Dtos;
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
    public async Task<IActionResult> CreateAuction([FromForm] CreateAuctionDto dto)
    {
        string imgUrl = "";

        if (dto.Image != null)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
            var path = Path.Combine("wwwroot/images", fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await dto.Image.CopyToAsync(stream);
            }

            imgUrl = "/images/" + fileName;
        }

        var auction = new Auction
        {
            Title = dto.Title,
            Description = dto.Description,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            Price = dto.Price,
            ImgUrl = imgUrl,
            IsDone = false,
            Category = dto.Category

        };

        _db.Auctions.Add(auction);
        await _db.SaveChangesAsync();

        return Ok(auction);
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