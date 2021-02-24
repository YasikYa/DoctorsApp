using System;
using System.Collections.Generic;
using System.Text;

namespace Artem.Doctors.Data.Models
{
    public class Doctor
    {
        public Doctor()
        {
            Specialties = new List<Specialty>();
            Records = new List<Record>();
        }

        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; }

        public User Identity { get; set; }

        public ICollection<Specialty> Specialties { get; set; }

        public ICollection<Record> Records { get; set; }
    }
}
