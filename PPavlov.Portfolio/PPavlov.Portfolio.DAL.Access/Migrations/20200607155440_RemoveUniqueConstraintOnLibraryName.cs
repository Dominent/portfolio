using Microsoft.EntityFrameworkCore.Migrations;

namespace PPavlov.Portfolio.DAL.Access.Migrations
{
    public partial class RemoveUniqueConstraintOnLibraryName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Libraries_Name",
                table: "Libraries");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Libraries",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Libraries",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Libraries_Name",
                table: "Libraries",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");
        }
    }
}
