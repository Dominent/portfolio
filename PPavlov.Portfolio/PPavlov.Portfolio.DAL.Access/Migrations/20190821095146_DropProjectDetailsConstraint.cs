using Microsoft.EntityFrameworkCore.Migrations;

namespace PPavlov.Portfolio.DAL.Access.Migrations
{
    public partial class DropProjectDetailsConstraint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_ProjectDetails_ProjectDetailId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_ProjectDetailId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ProjectDetailId",
                table: "Projects");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProjectDetailId",
                table: "Projects",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ProjectDetailId",
                table: "Projects",
                column: "ProjectDetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_ProjectDetails_ProjectDetailId",
                table: "Projects",
                column: "ProjectDetailId",
                principalTable: "ProjectDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
