using Artem.Doctors.Api.Authorization;
using Artem.Doctors.Api.ConfigurationModels;
using Artem.Doctors.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using NSwag;
using NSwag.Generation.Processors.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Artem.Doctors.Api
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly IHostEnvironment _environment;

        /// <summary>
        /// Initializes a new instance of the <see cref="Startup"/> class.
        /// </summary>
        /// <param name="configuration">Configuration of the web API.</param>
        /// <param name="environment">Hosting environment.</param>
        public Startup(IConfiguration configuration, IHostEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DoctorsDbContext>(options => options.UseSqlServer(_configuration.GetConnectionString("DoctorsDb")));
            services.AddSwaggerDocument(config => 
            {
                config.OperationProcessors.Add(new OperationSecurityScopeProcessor("JWT"));
                config.AddSecurity("JWT", new OpenApiSecurityScheme
                {
                    Type = OpenApiSecuritySchemeType.ApiKey,
                    In = OpenApiSecurityApiKeyLocation.Header,
                    Name = "Authorization",
                    Description = "Bearer {access_token}"
                });
            });
            services.AddControllers();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, config =>
                {
                    var jwtConfig = _configuration.GetSection("JWT").Get<JWTConfig>();
                    var signInKey = JWTHelper.CreateTokenSignInKey(jwtConfig.TokenSecurityKey);

                    config.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidAudience = jwtConfig.Audience,
                        ValidIssuer = jwtConfig.Issuer,
                        ValidateAudience = true,
                        ValidateIssuer = true,
                        IssuerSigningKey = signInKey
                    };
                });
            services.AddAuthorization();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseOpenApi()
               .UseSwaggerUi3()
               .UseRouting()
               .UseAuthentication()
               .UseAuthorization()
               .UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
