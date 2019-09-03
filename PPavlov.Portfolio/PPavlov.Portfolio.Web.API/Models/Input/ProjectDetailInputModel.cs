using System.Collections.Generic;
using Newtonsoft.Json;

namespace PPavlov.Portfolio.Web.API.Models.Input
{
    public class ProjectDetailInputModel
    {
        [JsonProperty("projectId")]
        public int ProjectId { get; set; }

        [JsonProperty("info")]
        public string Info { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("images")]
        public IEnumerable<ImageInputModel> Images { get; set; }

        [JsonProperty("links")]
        public IEnumerable<LinkInputModel> Links { get; set; }

        [JsonProperty("tags")]
        public IEnumerable<TagInputModel> Tags { get; set; }
    }
}