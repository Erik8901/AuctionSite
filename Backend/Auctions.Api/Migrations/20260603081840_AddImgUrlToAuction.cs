using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Auctions.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddImgUrlToAuction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // ImgUrl already exists in the database.
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Do not remove ImgUrl because it existed before this migration.
        }
    }
}
