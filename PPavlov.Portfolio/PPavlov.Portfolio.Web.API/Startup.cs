using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using PPavlov.Portfolio.DAL.Access;
using PPavlov.Portfolio.DAL.Entities;
using PPavlov.Portfolio.Web.API.Configuration;
using PPavlov.Portfolio.Web.API.Controllers;
using PPavlov.Portfolio.Web.API.Services;

namespace PPavlov.Portfolio.Web.API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _environment;

        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<PortfolioDbContext>(
                options => options.UseSqlServer(_configuration
                    .GetValue<string>("ConnectionStrings:SQLServer")));

            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<PortfolioDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<AuthenticationConfiguration>(_configuration.GetSection("Authentication"));
            services.Configure<EmailConfiguration>(_configuration.GetSection("Email"));

            services.AddMvc();

            var authenticationConfiguration = _configuration.GetSection("Authentication")
                .Get<AuthenticationConfiguration>();

            services
               .AddAuthentication(options =>
               {
                   options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                   options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                   options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
               })
               .AddJwtBearer(x =>
               {
                   if (_environment.IsDevelopment())
                   {
                       x.RequireHttpsMetadata = false;
                   }

                   x.SaveToken = true;
                   x.TokenValidationParameters = new TokenValidationParameters()
                   {
                       ValidateIssuerSigningKey = true,
                       ValidateAudience = true,
                       ValidateLifetime = true,
                       ValidateIssuer = true,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(authenticationConfiguration.Secret)),
                       ValidIssuer = authenticationConfiguration.Issuer,
                       ValidAudience = authenticationConfiguration.Audience
                   };
               });

            services.AddTransient<IUnitOfWork, PortfolioUnitOfWork>();
            services.AddTransient<IJwtTokenService, JwtTokenService>();
            services.AddTransient<IDocumentSerializer, Base64DocumentSerializer>();
            services.AddTransient<IEmailService, GmailEmailService>();
        }

        public void Configure(IApplicationBuilder app)
        {
            SeedDatabase(app);

            if (_environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(builder => builder
                .AllowAnyMethod()
                .AllowAnyOrigin()
                .AllowAnyHeader());

            app.UseStaticFiles();

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseMvc();
        }

        private void SeedDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
            }
        }
    }
}
