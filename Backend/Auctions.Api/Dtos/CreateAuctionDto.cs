namespace Auctions.Api.Dtos
{
    public class CreateAuctionDto
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Price { get; set; }
        public IFormFile? Image { get; set; }

        public string? Category { get; set; } = "";
    }
}
