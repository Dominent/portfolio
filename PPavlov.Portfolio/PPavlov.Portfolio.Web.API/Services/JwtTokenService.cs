using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.Web.API.Services
{
    public class JwtAuthToken
    {
        public string Value { get; set; }

        public TimeSpan ExpiresIn { get; set; }

        public string TokenType { get; set; }
    }

    public class JwtTokenService : IJwtTokenService
    {
        private readonly AuthenticationConfiguration _authenticationConfiguration;

        public JwtTokenService(IOptions<AuthenticationConfiguration> authenticationConfiguration)
        {
            _authenticationConfiguration = authenticationConfiguration.Value;
        }
        public JwtAuthToken Generate(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var symmetricSecurityKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(_authenticationConfiguration.Secret));

            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var expirationDays = DateTime.Now.AddMinutes(Convert.ToDouble(_authenticationConfiguration.AccessExpiration));

            var token = new JwtSecurityToken(
                issuer: _authenticationConfiguration.Issuer,
                audience: _authenticationConfiguration.Audience,
                claims: claims,
                expires: expirationDays,
                signingCredentials: signingCredentials,
                notBefore: DateTime.Now
           );

            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = jwtSecurityTokenHandler.WriteToken(token);

            return new JwtAuthToken()
            {
                Value = jwtToken,
                ExpiresIn = token.ValidTo.Subtract(token.ValidFrom),
                TokenType = "Bearer"
            };
        }
    }
}
