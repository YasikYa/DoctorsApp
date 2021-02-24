using System;
using System.Collections.Generic;
using System.Text;

namespace Artem.Doctors.Data.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public UserRole Role { get; set; }

        public Doctor Doctor { get; set; }

        public Patient Patient { get; set; }
    }

    public enum UserRole
    {
        Admin,
        Patient,
        Doctor
    }
}
