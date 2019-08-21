using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using PPavlov.Portfolio.DAL.Entities;
using PPavlov.Portfolio.Web.API.Models.Input;

namespace PPavlov.Portfolio.Web.API.Models.Output
{
    public class ProjectDetailsOutputModel : ProjectDetailInputModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("images")]
        public IEnumerable<ImageOutputModel> Images { get; set; }

        [JsonProperty("tags")]
        public IEnumerable<TagOutputModel> Tags { get; set; }

        [JsonProperty("links")]
        public IEnumerable<LinkOutputModel> Links { get; set; }

        public static ProjectDetailsOutputModel FromEntity(ProjectDetail projectDetails)
        {
            return new ProjectDetailsOutputModel()
            {
                Id = projectDetails.Id,
                ProjectId = projectDetails.ProjectId,
                Info = projectDetails.Info,
                Description = projectDetails.Description,
                Images = projectDetails.ProjectDetailImages.Select(x => new ImageOutputModel()
                {
                    Id = x.ImageId,
                    Path = x.Image.ImagePath,
                    Alt = x.Image.ImageAlt
                }).ToList(),
                Links = projectDetails.ProjectDetailLinks.Select(x => new LinkOutputModel()
                {
                    Id = x.ProjectLinkId,
                    Name = x.Link.Name,
                    Href = x.Link.Href
                }).ToList(),
                Tags = projectDetails.ProjectDetailTags.Select(x => new TagOutputModel()
                {
                    Id = x.ProjectTagId,
                    Name = x.Tag.Name
                }).ToList()
            };
        }
    }
}
