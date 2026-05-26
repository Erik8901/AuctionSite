using System.Text.Json.Serialization;

public class Bid
{
    public int Id { get; set; }
    public decimal Price { get; set; }
    public string Bidder { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public int AuctionId { get; set; }

    [JsonIgnore]
    public Auction Auction { get; set; } = null!;
}