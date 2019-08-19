using Newtonsoft.Json;
using PPavlov.Portfolio.Web.API.Controllers;

namespace PPavlov.Portfolio.Web.API.Models.Input
{
    public class ImageInputModel
    {
        [Base64]
        [JsonProperty("value")]
        public string Value { get; set; }
    }
}