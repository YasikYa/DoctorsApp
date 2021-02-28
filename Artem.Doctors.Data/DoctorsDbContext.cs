using Artem.Doctors.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Artem.Doctors.Data
{
    public class DoctorsDbContext : DbContext
    {
        public DoctorsDbContext(DbContextOptions<DoctorsDbContext> options) : base(options) { }

        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Record> Records { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Specialty> Specialties { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            ConfigureRelations(modelBuilder);
            ConfigureData(modelBuilder);
            modelBuilder.Entity<User>()
                        .Property(u => u.Role)
                        .HasConversion<string>();
        }

        private void ConfigureRelations(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Doctor>()
                        .HasMany(d => d.Specialties)
                        .WithMany(s => s.Doctors);

            modelBuilder.Entity<Doctor>()
                        .HasOne(d => d.Identity)
                        .WithOne(i => i.Doctor)
                        .HasForeignKey<Doctor>(d => d.Id);

            modelBuilder.Entity<Patient>()
                        .HasOne(p => p.Identity)
                        .WithOne(i => i.Patient)
                        .HasForeignKey<Patient>(p => p.Id);

            modelBuilder.Entity<Record>()
                        .HasKey(r => new { r.DoctorId, r.PatientId });

            modelBuilder.Entity<Record>()
                        .HasOne(r => r.Doctor)
                        .WithMany(d => d.Records)
                        .HasForeignKey(r => r.DoctorId)
                        .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Record>()
                        .HasOne(r => r.Patient)
                        .WithMany(p => p.Records)
                        .HasForeignKey(r => r.PatientId)
                        .OnDelete(DeleteBehavior.NoAction);
        }

        private void ConfigureData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User[]
            {
                new User
                {
                    Id = Guid.NewGuid(),
                    Email = "admin@mail.com",
                    Password = "admin",
                    FirstName = "Admin",
                    LastName = "Admin",
                    DateOfBirth = DateTime.Now,
                    Role = UserRole.Admin
                }
            });

            modelBuilder.Entity<Specialty>().HasData(new Specialty[]
            {
                new Specialty
                {
                    Id = Guid.NewGuid(),
                    Name = "Surgeon"
                }
            });
        }
    }
}
