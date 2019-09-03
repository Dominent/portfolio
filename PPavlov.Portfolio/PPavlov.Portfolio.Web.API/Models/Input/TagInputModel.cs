using Newtonsoft.Json;

namespace PPavlov.Portfolio.Web.API.Models.Input
{
    public class TagInputModel
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}