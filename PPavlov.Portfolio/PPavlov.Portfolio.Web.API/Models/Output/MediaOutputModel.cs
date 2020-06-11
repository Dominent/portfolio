using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.Web.API.Models.Output
{
    public class MediaOutputModel : Media
    {
        public int Size
        {
            get
            {
                return (this.Width * this.Height) * 3;
            }
        }

        public string Src
        {
            get
            {
                return System.IO.Path.Combine(this.Url, this.Name);
            }
        }

        public static MediaOutputModel FromEntity(Media media)
        {
            return new MediaOutputModel()
            {
                Id = media.Id,
                Url = media.Url,
                Name = media.Name,
                Extension = media.Extension,
                Height = media.Height,
                Width = media.Width,
                CreatedAt = media.CreatedAt,
                UpdatedAt = media.UpdatedAt
            };
        }
    }
}