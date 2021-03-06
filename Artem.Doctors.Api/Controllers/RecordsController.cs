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
using System.Security.Claims;
using System.Threading.Tasks;

namespace Artem.Doctors.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecordsController : ControllerBase
    {
        private readonly DoctorsDbContext _context;

        public RecordsController(DoctorsDbContext context) => _context = context;

        [HttpGet("doctor/{id}")]
        public ActionResult<IEnumerable<RecordDto>> GetAllByDoctorId([FromRoute]Guid doctorId)
        {
            return Ok(_context.Records.Where(r => r.DoctorId == doctorId).Select(r => new RecordDto
            {
                DoctorId = r.DoctorId,
                PatientId = r.PatientId,
                From = r.From,
                To = r.To
            }).ToList());
        }

        [HttpGet("patient/{id}")]
        public ActionResult<IEnumerable<RecordDto>> GetAllByPatientId([FromRoute] Guid patientId)
        {
            return Ok(_context.Records.Where(r => r.PatientId == patientId).Select(r => new RecordDto
            {
                DoctorId = r.DoctorId,
                PatientId = r.PatientId,
                From = r.From,
                To = r.To
            }).ToList());
        }

        [Authorize]
        [HttpPost]
        public ActionResult<RecordDto> Create(RecordDto model)
        {
            var doctorExists = _context.Doctors.Where(d => d.Id == model.DoctorId).Any();
            var patientExists = _context.Patients.Where(p => p.Id == model.PatientId).Any();
            if (!(doctorExists && patientExists))
                return NotFound();

            if (!VerifyAccessPolicies(model))
                return Forbid();

            // Verify record can be scheduled and has no conflicts with other records
            var timeOverlap = _context.Records.Where(r => r.DoctorId == model.DoctorId && ((model.From >= r.From && model.From <= r.To) || (model.To >= r.From && model.To <= r.To))).Any();
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
            return Ok(model);
        }

        [Authorize]
        [HttpDelete]
        public ActionResult Delete([FromQuery]Guid doctorId, [FromQuery]Guid patientId)
        {
            var record = _context.Records.Find(new[] { doctorId, patientId });
            if (record == null)
                return NotFound();

            if (!VerifyAccessPolicies(new RecordDto { DoctorId = doctorId, PatientId = patientId }))
                return Forbid();

            _context.Records.Remove(record);
            _context.SaveChanges();
            return Ok();
        }

        private bool VerifyAccessPolicies(RecordDto record)
        {
            var userId = new Guid(User.FindFirst(JwtRegisteredClaimNames.Sub).Value);
            var userRole = Enum.Parse<UserRole>(User.FindFirst("role").Value);
            if (userRole == UserRole.Doctor)
                return userId == record.DoctorId; // Doctor can operate on his own records only
            else if (userRole == UserRole.Patient)
                return userId == record.PatientId; // Patient can operate on his own records only
            else
                return true;
        }
    }
}
