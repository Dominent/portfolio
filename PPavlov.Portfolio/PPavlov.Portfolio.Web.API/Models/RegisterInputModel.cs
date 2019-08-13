using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace PPavlov.Portfolio.Web.API.Models
{
    public class RegisterInputModel
    {
        [Required]
        [MinLength(6, ErrorMessage = "Insufficient username length. Username must be more than 6 chars length.")]
        [JsonProperty("username")]
        public string Username { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        [JsonProperty("email")]
        public string Email { get; set; }

        [Required]
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}
