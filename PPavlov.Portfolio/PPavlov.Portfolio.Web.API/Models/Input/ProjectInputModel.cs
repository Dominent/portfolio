using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using PPavlov.Portfolio.Web.API.Controllers;

namespace PPavlov.Portfolio.Web.API.Models.Input
{
    public class ProjectInputModel
    {
        [Required]
        [JsonProperty("title")]
        public string Title { get; set; }

        [Base64]
        [JsonProperty("image")]
        public string Image { get; set; }

        [JsonProperty("location")]
        public string Location { get; set; }

        [JsonProperty("startDate")]
        public DateTime StartDate { get; set; }

        [JsonProperty("endDate")]
        public DateTime? EndDate { get; set; }

        [JsonProperty("ongoing")]
        public bool Ongoing { get; set; }
    }
}
