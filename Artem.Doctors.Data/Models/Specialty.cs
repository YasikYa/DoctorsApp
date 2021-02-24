using System;
using System.Collections.Generic;
using System.Text;

namespace Artem.Doctors.Data.Models
{
    public class Specialty
    {
        public Specialty()
        {
            Doctors = new List<Doctor>();
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public ICollection<Doctor> Doctors { get; set; }
    }
}
