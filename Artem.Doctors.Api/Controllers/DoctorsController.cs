using Artem.Doctors.Data;
using Artem.Doctors.Data.DTOs;
using Artem.Doctors.Data.Models;
using Microsoft.AspNetCore.Authorization;
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
        public ActionResult<IEnumerable<DoctorDetailsDto>> GetAll()
        {
            return Ok(_context.Doctors.Select(d => new DoctorDetailsDto
            {
                Id = d.Id,
                FirstName = d.Identity.FirstName,
                LastName = d.Identity.LastName,
                DateOfBirth = d.Identity.DateOfBirth,
                ContactPhone = d.ContactPhone,
                ConsultPrice = d.ConsultPrice,
                Email = d.Identity.Email,
                Specialties = d.Specialties.Select(s => new SpecialtyDto { Id = s.Id, Name = s.Name })
            }).ToList());
        }

        [Authorize(Roles = nameof(UserRole.Admin))]
        [HttpPost]
        public IActionResult Create(DoctorCreateDto model)
        {
            var identityExists = _context.Users.Where(u => u.Email.Equals(model.Email)).Any();
            if (identityExists)
                return BadRequest("Doctor exists");

            var doctor = new Doctor
            {

                ContactPhone = model.ContactPhone,
                ConsultPrice = model.ConsultPrice,
                Identity = new Data.Models.User
                {
                    Email = model.Email,
                    Password = model.Password,
                    Role = Data.Models.UserRole.Doctor,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    DateOfBirth = model.DateOfBirth,
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

            return Ok(new DoctorDetailsDto
            {
                Id = doctor.Id,
                FirstName = doctor.Identity.FirstName,
                LastName = doctor.Identity.LastName,
                DateOfBirth = doctor.Identity.DateOfBirth,
                ContactPhone = doctor.ContactPhone,
                ConsultPrice = doctor.ConsultPrice,
                Email = doctor.Identity.Email,
                Specialties = doctor.Specialties.Select(s => new SpecialtyDto { Id = s.Id, Name = s.Name })
            });
        }

        [Authorize(Roles = nameof(UserRole.Admin))]
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
