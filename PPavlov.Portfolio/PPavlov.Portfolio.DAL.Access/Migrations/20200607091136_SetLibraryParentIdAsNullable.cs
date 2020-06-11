using Microsoft.EntityFrameworkCore.Migrations;

namespace PPavlov.Portfolio.DAL.Access.Migrations
{
    public partial class SetLibraryParentIdAsNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Libraries_ParentId",
                table: "Libraries");

            migrationBuilder.AlterColumn<int>(
                name: "ParentId",
                table: "Libraries",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Libraries_ParentId",
                table: "Libraries",
                column: "ParentId",
                unique: true,
                filter: "[ParentId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Libraries_ParentId",
                table: "Libraries");

            migrationBuilder.AlterColumn<int>(
                name: "ParentId",
                table: "Libraries",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Libraries_ParentId",
                table: "Libraries",
                column: "ParentId",
                unique: true);
        }
    }
}
