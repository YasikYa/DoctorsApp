using System;
using System.Collections.Generic;
using System.Text;

namespace Artem.Doctors.Data.Models
{
    public class Record
    {
        public Guid DoctorId { get; set; }

        public Guid PatientId { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }

        public Guid CreatedBy { get; set; }

        public Doctor Doctor { get; set; }

        public Patient Patient { get; set; }
    }
}
