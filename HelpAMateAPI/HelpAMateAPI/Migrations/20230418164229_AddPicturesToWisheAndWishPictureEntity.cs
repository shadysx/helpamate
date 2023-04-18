using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HelpAMateAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddPicturesToWisheAndWishPictureEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WishPicture",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PictureUrl = table.Column<string>(type: "text", nullable: false),
                    WishId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WishPicture", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WishPicture_Wishes_WishId",
                        column: x => x.WishId,
                        principalTable: "Wishes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_WishPicture_WishId",
                table: "WishPicture",
                column: "WishId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WishPicture");
        }
    }
}
