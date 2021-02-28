using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Artem.Doctors.Data.Migrations
{
    public partial class SeedAdminAndSurgeonSpec : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Specialties",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("1ea56bd6-9397-40c4-b056-6d2f747216a6"), "Surgeon" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DateOfBirth", "Email", "FirstName", "LastName", "Password", "Role" },
                values: new object[] { new Guid("6df0e56c-3c61-455b-96bd-a205cbc15fb0"), new DateTime(2021, 2, 27, 19, 33, 40, 858, DateTimeKind.Local).AddTicks(5257), "admin@mail.com", "Admin", "Admin", "admin", "Admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Specialties",
                keyColumn: "Id",
                keyValue: new Guid("1ea56bd6-9397-40c4-b056-6d2f747216a6"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("6df0e56c-3c61-455b-96bd-a205cbc15fb0"));
        }
    }
}
