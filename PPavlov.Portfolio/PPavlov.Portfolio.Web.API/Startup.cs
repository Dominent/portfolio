using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
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

            ConfigureSwagger(services);

            ConfigureAuthentication(services);

            services.AddTransient<IUnitOfWork, PortfolioUnitOfWork>();
            services.AddTransient<IJwtTokenService, JwtTokenService>();
            services.AddTransient<IDocumentSerializer, Base64DocumentSerializer>();
            services.AddTransient<IEmailService, GmailEmailService>();
            services.AddTransient<IUploadImageService, UploadImageService>();
        }

        private void ConfigureAuthentication(IServiceCollection services)
        {
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
                        IssuerSigningKey =
                            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(authenticationConfiguration.Secret)),
                        ValidIssuer = authenticationConfiguration.Issuer,
                        ValidAudience = authenticationConfiguration.Audience
                    };
                });
        }

        private void ConfigureSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "PPavlov Portfolio API", Version = "v1"});
                c.AddSecurityDefinition("Bearer",
                    new OpenApiSecurityScheme()
                    {
                        Description =
                            @"JWT Authorization header using the Bearer scheme. 
                            Enter 'Bearer' [space] and then your token in the text input below.
                            Example: 'Bearer 12345'",
                        Name = "Authorization",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.ApiKey,
                        Scheme = "Bearer"
                    });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });
            });
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

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "PPavlov Portfolio API V1");
                c.RoutePrefix = string.Empty;
            });

            app.UseMvc();
        }

        private void SeedDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
                var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var signInManager = serviceScope.ServiceProvider.GetRequiredService<SignInManager<User>>();
                var configuration = serviceScope.ServiceProvider.GetRequiredService<IConfiguration>();

                if(!context.Users.Any())
                {
                    var admin = new User
                    {
                        UserName = configuration["Admin:Username"],
                        Email = configuration["Admin:Email"],
                        EmailConfirmed = true
                    };

                    var identityResult = userManager.CreateAsync(admin, configuration["Admin:Password"]).Result;
                }
            }
        }
    }
}
