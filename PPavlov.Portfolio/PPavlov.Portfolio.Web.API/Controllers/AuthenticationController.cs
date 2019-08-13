using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PPavlov.Portfolio.DAL.Entities;
using PPavlov.Portfolio.Web.API.Models;

namespace PPavlov.Portfolio.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtTokenService _authenticationTokenGenerator;
        private readonly UserManager<User> _userManager;

        public AuthenticationController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IJwtTokenService authenticationTokenGenerator
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _authenticationTokenGenerator = authenticationTokenGenerator;
        }

        [HttpPost(nameof(AuthenticationController.Login))]
        public async Task<IActionResult> Login([FromBody]LoginInputModel loginInputModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(
                loginInputModel.Username,
                loginInputModel.Password,
                false, false
            );

            if (!result.Succeeded)
            {
                return this.BadRequest();
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(u =>
                u.UserName == loginInputModel.Username);

            var token = _authenticationTokenGenerator.Generate(user);

            var outputModel = new LoginOutputModel()
            {
                Token = token.Value,
                ExpiresIn = token.ExpiresIn,
                TokenType = token.TokenType
            };

            return Ok(outputModel);
        }

        public class LoginOutputModel
        {
            [JsonProperty("token")]
            public string Token { get; set; }

            [JsonProperty("expiresIn")]
            public TimeSpan ExpiresIn { get; set; }

            [JsonProperty("tokenType")]
            public string TokenType { get; set; }
        }

        [HttpPost(nameof(AuthenticationController.Register))]
        public async Task<IActionResult> Register([FromBody]RegisterInputModel registerInputModel)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest(ModelState);
            }

            var user = new User
            {
                UserName = registerInputModel.Username,
                Email = registerInputModel.Email
            };

            var result = await _userManager.CreateAsync(user, registerInputModel.Password);

            if (!result.Succeeded)
            {
                return this.BadRequest(result.Errors);
            }

            //TODO(PPavlov): When user by id endpoint is available switch to Created
            return this.Ok(user);
        }
    }
}
