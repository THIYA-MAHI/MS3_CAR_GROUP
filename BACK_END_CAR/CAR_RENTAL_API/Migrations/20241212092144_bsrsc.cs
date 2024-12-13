using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CAR_RENTAL_API.Migrations
{
    /// <inheritdoc />
    public partial class bsrsc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ModeltbId",
                table: "Cars",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Models",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ModelName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Models", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_ModeltbId",
                table: "Cars",
                column: "ModeltbId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Models_ModeltbId",
                table: "Cars",
                column: "ModeltbId",
                principalTable: "Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Models_ModeltbId",
                table: "Cars");

            migrationBuilder.DropTable(
                name: "Models");

            migrationBuilder.DropIndex(
                name: "IX_Cars_ModeltbId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "ModeltbId",
                table: "Cars");
        }
    }
}
