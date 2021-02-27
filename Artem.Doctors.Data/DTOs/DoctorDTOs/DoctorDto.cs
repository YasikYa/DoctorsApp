using System;
using System.Collections.Generic;
using System.Text;

namespace Artem.Doctors.Data.DTOs
{
    public class DoctorDto
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string ContactPhone { get; set; }

        public int ConsultPrice { get; set; }
    }
}
