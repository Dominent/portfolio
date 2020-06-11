using Microsoft.EntityFrameworkCore.Migrations;

namespace PPavlov.Portfolio.DAL.Access.Migrations
{
    public partial class RemoveUniqueConstraintOnLibraryParentId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Libraries_ParentId",
                table: "Libraries");

            migrationBuilder.CreateIndex(
                name: "IX_Libraries_ParentId",
                table: "Libraries",
                column: "ParentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Libraries_ParentId",
                table: "Libraries");

            migrationBuilder.CreateIndex(
                name: "IX_Libraries_ParentId",
                table: "Libraries",
                column: "ParentId",
                unique: true,
                filter: "[ParentId] IS NOT NULL");
        }
    }
}
