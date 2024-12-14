using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CAR_RENTAL_API.Migrations
{
    /// <inheritdoc />
    public partial class dat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Models_ModeltbId",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "ModeltbId",
                table: "Cars",
                newName: "ModelId");

            migrationBuilder.RenameIndex(
                name: "IX_Cars_ModeltbId",
                table: "Cars",
                newName: "IX_Cars_ModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Models_ModelId",
                table: "Cars",
                column: "ModelId",
                principalTable: "Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Models_ModelId",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "ModelId",
                table: "Cars",
                newName: "ModeltbId");

            migrationBuilder.RenameIndex(
                name: "IX_Cars_ModelId",
                table: "Cars",
                newName: "IX_Cars_ModeltbId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Models_ModeltbId",
                table: "Cars",
                column: "ModeltbId",
                principalTable: "Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
