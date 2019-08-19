using System;
using Newtonsoft.Json;
using PPavlov.Portfolio.Web.API.Models.Input;

namespace PPavlov.Portfolio.Web.API.Models.Output
{
    public class ProjectOutputModel : ProjectInputModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }
    }
}