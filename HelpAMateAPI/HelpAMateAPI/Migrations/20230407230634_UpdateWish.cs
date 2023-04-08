using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HelpAMateAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWish : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Wishes_Users_UserId",
                table: "Wishes");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Wishes",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Wishes_Users_UserId",
                table: "Wishes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Wishes_Users_UserId",
                table: "Wishes");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Wishes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Wishes_Users_UserId",
                table: "Wishes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
