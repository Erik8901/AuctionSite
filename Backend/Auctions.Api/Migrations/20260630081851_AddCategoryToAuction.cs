using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Auctions.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryToAuction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // ImgUrl and Category already exist in the database.
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Do not remove or rename existing database columns
        }
    }
}
