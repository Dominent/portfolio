using Newtonsoft.Json;

namespace PPavlov.Portfolio.Web.API.Models.Input
{
    public class LinkInputModel
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("href")]
        public string Href { get; set; }
    }
}