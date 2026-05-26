namespace Auctions.Api.Models
{
    public class CreateBidDto
    {
        public decimal Price { get; set; }
        public string Bidder { get; set; } = "";
        public DateTime CreatedAt { get; set; }
    }
}
