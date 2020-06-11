using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PPavlov.Portfolio.DAL.Access.Migrations
{
    public partial class FixRelationshipBetweenMediaLibrary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LibraryMedia");

            migrationBuilder.AddColumn<int>(
                name: "LibraryId",
                table: "Media",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Media_LibraryId",
                table: "Media",
                column: "LibraryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Media_Libraries_LibraryId",
                table: "Media",
                column: "LibraryId",
                principalTable: "Libraries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Media_Libraries_LibraryId",
                table: "Media");

            migrationBuilder.DropIndex(
                name: "IX_Media_LibraryId",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "LibraryId",
                table: "Media");

            migrationBuilder.CreateTable(
                name: "LibraryMedia",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    LibraryId = table.Column<int>(nullable: false),
                    MediaId = table.Column<int>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LibraryMedia", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LibraryMedia_Libraries_LibraryId",
                        column: x => x.LibraryId,
                        principalTable: "Libraries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LibraryMedia_Media_MediaId",
                        column: x => x.MediaId,
                        principalTable: "Media",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LibraryMedia_LibraryId",
                table: "LibraryMedia",
                column: "LibraryId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryMedia_MediaId",
                table: "LibraryMedia",
                column: "MediaId");
        }
    }
}
