using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Artem.Doctors.Api.ConfigurationModels
{
    public class JWTConfig
    {
        public string TokenSecurityKey { get; set; }

        public string Issuer { get; set; }

        public string Audience { get; set; }
    }
}
