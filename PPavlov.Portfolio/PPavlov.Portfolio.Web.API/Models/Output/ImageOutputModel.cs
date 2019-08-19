using Newtonsoft.Json;
using PPavlov.Portfolio.Web.API.Models.Input;

namespace PPavlov.Portfolio.Web.API.Models.Output
{
    public class ImageOutputModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("path")]
        public string Path { get; set; }

        [JsonProperty("alt")]
        public string Alt { get; set; }
    }
}