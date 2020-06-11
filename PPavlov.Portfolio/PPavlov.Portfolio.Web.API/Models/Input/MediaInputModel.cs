using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace PPavlov.Portfolio.Web.API.Controllers
{
    public class MediaInputModel
    {
        [Required]
        public IFormFile Media { get; set; }

        [Required]
        public int LibraryId { get; set; }
    }
}
