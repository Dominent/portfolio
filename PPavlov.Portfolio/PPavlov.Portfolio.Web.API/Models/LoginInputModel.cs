using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace PPavlov.Portfolio.Web.API.Models
{
    public class LoginInputModel
    {
        [Required]
        [JsonProperty("username")]
        public string Username { get; set; }

        [Required]
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}
