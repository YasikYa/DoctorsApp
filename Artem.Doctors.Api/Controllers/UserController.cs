using Artem.Doctors.Api.Authorization;
using Artem.Doctors.Api.ConfigurationModels;
using Artem.Doctors.Data;
using Artem.Doctors.Data.DTOs;
using Artem.Doctors.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Artem.Doctors.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DoctorsDbContext _context;

        public UserController(IConfiguration configuration, DoctorsDbContext context) => (_configuration, _context) = (configuration, context);

        [HttpGet("token")]
        public ActionResult Get(string email, string password)
        {
            var user = _context.Users.Where(u => u.Email == email).FirstOrDefault();
            if (user == null || user.Password != password)
                return BadRequest();

            var jwtConfig = _configuration.GetSection("JWT").Get<JWTConfig>();
            var tokenJson = JWTHelper.CreateTokenJson(user, jwtConfig);
            return Ok(new { access_token = tokenJson });
        }

        [HttpPost]
        public ActionResult<UserCreateDto> Create(UserCreateDto model)
        {
            if (_context.Users.Where(u => u.Email == model.Email).Any())
                return BadRequest();

            var patient = new Patient
            {
                Identity = new User
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    DateOfBirth = model.DateOfBirth,
                    Email = model.Email,
                    Password = model.Password,
                    Role = UserRole.Patient
                }
            };
            _context.Patients.Add(patient);
            _context.SaveChanges();

            return Ok(new UserDto { Id = patient.Id, Email = patient.Identity.Email, FullName = $"{patient.Identity.FirstName} {patient.Identity.LastName}" });
        }
    }
}
