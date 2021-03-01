using Artem.Doctors.Api.Authorization;
using Artem.Doctors.Api.ConfigurationModels;
using Artem.Doctors.Data;
using Artem.Doctors.Data.DTOs;
using Artem.Doctors.Data.DTOs.UserDTOs;
using Artem.Doctors.Data.Models;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpGet("me")]
        public ActionResult<UserDto> Current()
        {
            var userId = new Guid(User.FindFirst(JwtRegisteredClaimNames.Sub).Value);

            var user = _context.Users.Find(userId);
            if (user == null)
                return NotFound();

            return Ok(new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                FullName = $"{user.FirstName} {user.LastName}",
                Role = user.Role
            });
        }

        [HttpPost("token")]
        public ActionResult Token(LoginDto model)
        {
            var user = _context.Users.Where(u => u.Email == model.Email).FirstOrDefault();
            if (user == null || user.Password != model.Password)
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
