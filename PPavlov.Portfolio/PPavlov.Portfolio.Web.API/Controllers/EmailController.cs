using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using PPavlov.Portfolio.Web.API.Configuration;
using PPavlov.Portfolio.Web.API.Models.Input;
using PPavlov.Portfolio.Web.API.Services;

namespace PPavlov.Portfolio.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly EmailConfiguration _emailConfiguration;

        public EmailController(
            IEmailService emailService,
            IOptions<EmailConfiguration> emailConfiguration
        )
        {
            _emailService = emailService;
            _emailConfiguration = emailConfiguration.Value;
        }

        [HttpPost(nameof(Send))]
        public async Task<IActionResult> Send([FromBody]SendEmailInputModel sendEmailInputModel)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest(ModelState.Values);
            }

            await _emailService.SendAsync(_emailConfiguration.To, sendEmailInputModel.Subject, sendEmailInputModel.Body);

            return this.Ok();
        }
    }
}
