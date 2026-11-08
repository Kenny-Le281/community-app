using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CommunityApp.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddEventCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "category",
                table: "events",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_events_category",
                table: "events",
                column: "category");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_events_category",
                table: "events");

            migrationBuilder.DropColumn(
                name: "category",
                table: "events");
        }
    }
}
