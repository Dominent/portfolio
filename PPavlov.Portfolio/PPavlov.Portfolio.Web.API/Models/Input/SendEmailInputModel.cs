using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace PPavlov.Portfolio.Web.API.Models.Input
{
    public class SendEmailInputModel
    {
        [Required]
        [JsonProperty("subject")]
        public string Subject { get; set; }

        [JsonProperty("body")]
        public string Body { get; set; }
    }
}