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
            migrationBuilder.RenameColumn(
                name: "imgUrl",
                table: "Auctions",
                newName: "ImgUrl");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Auctions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Auctions");

            migrationBuilder.RenameColumn(
                name: "ImgUrl",
                table: "Auctions",
                newName: "imgUrl");
        }
    }
}
