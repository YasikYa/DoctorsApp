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

        public string ContactPhone { get; set; }

        public int ConsultPrice { get; set; }

        public User Identity { get; set; }

        public ICollection<Specialty> Specialties { get; set; }

        public ICollection<Record> Records { get; set; }
    }
}
