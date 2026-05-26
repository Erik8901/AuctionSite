using Auctions.Api.Models;

public class Auction
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string CreatedBy { get; set; } = "";

    public decimal Price { get; set; }
    public bool IsDone { get; set; }

    public List<Bid> Bids { get; set; } = new();
}