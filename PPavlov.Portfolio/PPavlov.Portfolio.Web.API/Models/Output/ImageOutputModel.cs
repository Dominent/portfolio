using Newtonsoft.Json;
using PPavlov.Portfolio.DAL.Entities;
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

        public static ImageOutputModel FromEntity(Image image)
        {
            return new ImageOutputModel()
            {
                Id = image.Id,
                Path = image.ImagePath,
                Alt = image.ImageAlt
            };
        }
    }
}