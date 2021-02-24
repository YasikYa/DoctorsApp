using Artem.Doctors.Data;
using Artem.Doctors.Data.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Artem.Doctors.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly DoctorsDbContext _context;

        public DoctorsController(DoctorsDbContext context) => _context = context;

        [HttpGet]
        public ActionResult<IEnumerable<DoctorDto>> GetAll()
        {
            return Ok(_context.Doctors.Select(d => new DoctorDto
            {
                Id = d.Id,
                FirstName = d.FirstName,
                LastName = d.LastName,
                DateOfBirth = d.DateOfBirth,
                Address = d.Address
            }).ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<DoctorDetailsDto> Details([FromRoute] Guid id)
        {
            var doctor = _context.Doctors.Include(d => d.Specialties).Include(d => d.Identity).Where(d => d.Id == id).FirstOrDefault();
            if (doctor == null)
                return NotFound();

            return Ok(new DoctorDetailsDto
            {
                Id = doctor.Id,
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                DateOfBirth = doctor.DateOfBirth,
                Address = doctor.Address,
                Email = doctor.Identity.Email,
                Specialties = doctor.Specialties.Select(s => new SpecialtyDto { Id = s.Id, Name = s.Name })
            });
        }

        [HttpPost]
        public IActionResult Create(DoctorCreateDto model)
        {
            var identityExists = _context.Users.Where(u => u.Email.Equals(model.Email)).Any();
            if (identityExists)
                return BadRequest("Doctor exists");

            var doctor = new Data.Models.Doctor
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Address = model.Address,
                DateOfBirth = model.DateOfBirth,
                Identity = new Data.Models.User
                {
                    Email = model.Email,
                    Password = model.Password,
                    Role = Data.Models.UserRole.Doctor
                }
            };
            _context.Doctors.Add(doctor);
            foreach (var specialtyId in model.Specialties)
            {
                var speciality = _context.Specialties.Find(specialtyId);
                if (speciality == null)
                    return NotFound();

                speciality.Doctors.Add(doctor);
            }
            _context.SaveChanges();
            return Ok(doctor.Id);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] Guid id)
        {
            var doctor = _context.Doctors.Find(id);
            if (doctor == null)
                return NotFound();

            _context.Doctors.Remove(doctor);
            _context.SaveChanges();
            return Ok();
        }
    }
}
