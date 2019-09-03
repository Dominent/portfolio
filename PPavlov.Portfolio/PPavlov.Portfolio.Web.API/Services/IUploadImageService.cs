using System.Threading.Tasks;
using PPavlov.Portfolio.DAL.Entities;
using PPavlov.Portfolio.Web.API.Controllers;

namespace PPavlov.Portfolio.Web.API.Services
{
    public interface IUploadImageService
    {
        Task<Image> UploadImage([Base64] string image, string authority);
    }
}