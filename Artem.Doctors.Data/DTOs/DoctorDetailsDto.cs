using System;
using System.Collections.Generic;
using System.Text;

namespace Artem.Doctors.Data.DTOs
{
    public class DoctorDetailsDto
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public IEnumerable<SpecialtyDto> Specialties { get; set; }
    }
}
