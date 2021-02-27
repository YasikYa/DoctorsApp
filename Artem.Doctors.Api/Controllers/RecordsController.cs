using Artem.Doctors.Data;
using Artem.Doctors.Data.DTOs;
using Artem.Doctors.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Artem.Doctors.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecordsController : ControllerBase
    {
        private readonly DoctorsDbContext _context;

        public RecordsController(DoctorsDbContext context) => _context = context;

        [Authorize]
        [HttpPost]
        public ActionResult Create(RecordDto model)
        {
            var doctorExists = _context.Doctors.Where(d => d.Id == model.DoctorId).Any();
            var patientExists = _context.Patients.Where(p => p.Id == model.PatientId).Any();
            if (!(doctorExists && patientExists))
                return NotFound();

            // Verify record can be scheduled and has no conflicts with other records
            var timeOverlap = _context.Records.Where(r => (model.From >= r.From && model.From <= r.To) || (model.To >= r.From && model.To <= r.To)).Any();
            if (timeOverlap)
                return BadRequest();

            var userId = new Guid(User.FindFirst(JwtRegisteredClaimNames.Sub).Value);
            _context.Records.Add(new Record
            {
                DoctorId = model.DoctorId,
                PatientId = model.PatientId,
                From = model.From,
                To = model.To,
                CreatedBy = userId
            });
            _context.SaveChanges();
            return null;
        }
    }
}
