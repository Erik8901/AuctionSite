using Auctions.Api.Dtos;
using Auctions.Api.Models;
using Auctions.Api.Services;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class AuctionController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly TranslationService _translationService;
    private readonly ILogger<AuctionController> _logger;

    public AuctionController(
    AppDbContext db,
    TranslationService translationService,
    ILogger<AuctionController> logger)
    {
        _db = db;
        _translationService = translationService;
        _logger = logger;
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
    public async Task<IActionResult> CreateAuction(
    [FromForm] CreateAuctionDto dto)
    {
        string imgUrl = "";

        // Upload image
        if (dto.Image != null)
        {
            var fileName = Guid.NewGuid() +
                Path.GetExtension(dto.Image.FileName);

            var path = Path.Combine("wwwroot/images", fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await dto.Image.CopyToAsync(stream);
            }

            imgUrl = "/images/" + fileName;
        }

        // Create auction with original content
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

        // Save original auction first
        _db.Auctions.Add(auction);
        await _db.SaveChangesAsync();

        // Automatically translate auction
        try
        {
            // Translate to English
            var english = await _translationService.TranslateAsync(
                auction.Title,
                auction.Description,
                "EN"
            );

            // Translate to Swedish
            var swedish = await _translationService.TranslateAsync(
                auction.Title,
                auction.Description,
                "SV"
            );

            // Save detected original language
            auction.OriginalLanguage =
                english.OriginalLanguage.ToLowerInvariant();

            // Save English translations
            auction.TitleEn = english.Title;
            auction.DescriptionEn = english.Description;

            // Save Swedish translations
            auction.TitleSv = swedish.Title;
            auction.DescriptionSv = swedish.Description;

            await _db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(
                ex,
                "Translation failed for auction {AuctionId}",
                auction.Id
            );
        }

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

    [HttpGet("test-translation")]
    public async Task<IActionResult> TestTranslation()
    {
        var result = await _translationService.TranslateAsync(
            "Fin cykel till salu",
            "En begagnad cykel i bra skick.",
            "EN"
        );

        return Ok(result);
    }


}