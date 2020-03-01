using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using PPavlov.Portfolio.DAL.Entities;
using PPavlov.Portfolio.Web.API.Controllers;

namespace PPavlov.Portfolio.Web.API.Services
{
    public class UploadImageService : IUploadImageService
    {
        private readonly IDocumentSerializer _documentSerializer;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UploadImageService(
            IDocumentSerializer documentSerializer,
            IHostingEnvironment hostingEnvironment,
            IHttpContextAccessor httpContextAccessor
        )
        {
            _documentSerializer = documentSerializer;
            _hostingEnvironment = hostingEnvironment;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Image> UploadImage([Base64]string image)
        {
            var request = this._httpContextAccessor.HttpContext.Request;

            var authority = $"{request.Scheme}://{request.Host}{request.PathBase}";

            var document = _documentSerializer.Deserialize(image);

            var name = $"{Guid.NewGuid()}{document.Extension}";
            var path = Path.Combine($"{_hostingEnvironment.ContentRootPath}/wwwroot/storage");

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            await File.WriteAllBytesAsync($"{path}/{name}", document.Buffer);

            return new Image()
            {
                ImagePath = $"{authority}/storage/{name}"
            };
        }
    }
}