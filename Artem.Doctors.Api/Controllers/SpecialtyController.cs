using Artem.Doctors.Data;
using Artem.Doctors.Data.DTOs;
using Artem.Doctors.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Artem.Doctors.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecialtyController : ControllerBase
    {
        private readonly DoctorsDbContext _context;

        public SpecialtyController(DoctorsDbContext context) => _context = context;

        [HttpGet]
        public ActionResult<IEnumerable<SpecialtyDto>> GetAll()
        {
            return Ok(_context.Specialties.Select(s => new SpecialtyDto { Id = s.Id, Name = s.Name }).ToList());
        }

        [Authorize(Roles = nameof(UserRole.Admin))]
        [HttpPost]
        public ActionResult Create([FromBody]string name)
        {
            var specialty = _context.Specialties.Where(s => s.Name == name).FirstOrDefault();
            if (specialty != null)
                return BadRequest();

            specialty = new Specialty
            {
                Name = name
            };
            _context.Specialties.Add(specialty);
            _context.SaveChanges();

            return Ok(new SpecialtyDto { Id = specialty.Id, Name = specialty.Name });
        }

        [Authorize(Roles = nameof(UserRole.Admin))]
        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute]Guid id)
        {
            var specialty = _context.Specialties.Find(id);
            if (specialty == null)
                return NotFound();

            _context.Specialties.Remove(specialty);
            _context.SaveChanges();

            return Ok();
        }
    }
}
