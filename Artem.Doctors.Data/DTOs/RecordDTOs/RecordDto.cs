using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Artem.Doctors.Data.DTOs
{
    public class RecordDto
    {
        [Required]
        public Guid DoctorId { get; set; }

        [Required]
        public Guid PatientId { get; set; }

        [Required]
        public DateTime From { get; set; }

        [Required]
        public DateTime To { get; set; }
    }
}
