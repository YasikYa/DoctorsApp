using Artem.Doctors.Api.ConfigurationModels;
using Artem.Doctors.Data.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Artem.Doctors.Api.Authorization
{
    public static class JWTHelper
    {
        public static SecurityKey CreateTokenSignInKey(string secretString)
        {
            var securityKeyBytes = Encoding.UTF8.GetBytes(secretString);
            return new SymmetricSecurityKey(securityKeyBytes);
        }

        public static SigningCredentials CreateTokenSignInCredential(string secretString)
        {
            return new SigningCredentials(CreateTokenSignInKey(secretString), SecurityAlgorithms.HmacSha256);
        }

        public static string CreateTokenJson(User user, JWTConfig jwtConfig)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim("role", user.Role.ToString())
            };

            var token = new JwtSecurityToken(jwtConfig.Issuer, jwtConfig.Audience, claims, DateTime.Now, DateTime.Now.AddDays(1), CreateTokenSignInCredential(jwtConfig.TokenSecurityKey));
            var tokenJson = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenJson;
        }
    }
}
