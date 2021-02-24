using System;
using System.Collections.Generic;
using System.Text;

namespace Artem.Doctors.Data.Models
{
    public class Patient
    {
        public Patient()
        {
            Records = new List<Record>();
        }

        public Guid Id { get; set; }

        public User Identity { get; set; }

        public ICollection<Record> Records { get; set; }
    }
}
