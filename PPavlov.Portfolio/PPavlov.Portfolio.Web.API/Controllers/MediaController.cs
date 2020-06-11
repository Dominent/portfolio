using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ImageMagick;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using PPavlov.Portfolio.DAL.Access;
using PPavlov.Portfolio.DAL.Entities;
using PPavlov.Portfolio.Web.API.Models.Output;

namespace PPavlov.Portfolio.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IUnitOfWork _unitOfWork;

        public MediaController(
            IHostingEnvironment hostingEnvironment,
            IUnitOfWork unitOfWork
        )
        {
            _hostingEnvironment = hostingEnvironment;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var medias = await _unitOfWork.MediaRepository
                .GetAllAsync(_ => true);

            var outputModel = medias
                .Select(m => MediaOutputModel.FromEntity(m))
                .ToList();

            return this.Ok(outputModel);
        }

        [HttpPost]
        public async Task<IActionResult> Upload([FromForm]MediaInputModel mediaInputModel)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest(this.ModelState.Values);
            }

            var library = await _unitOfWork.LibraryRepository.GetByIdAsync(mediaInputModel.LibraryId);

            if(library == null)
            {
                return this.NotFound(mediaInputModel.LibraryId);
            }

            var wwwrootPath = Path.Combine($"{_hostingEnvironment.ContentRootPath}/wwwroot/storage");
            var directory = wwwrootPath;
            while (library.Parent != null)
            {
                directory = Path.Combine(directory, library.Name);
            }

            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            var extension = Path.GetExtension(mediaInputModel.Media.FileName);
            var filename = Path.GetFileNameWithoutExtension(mediaInputModel.Media.FileName);

            var name = $"{filename}_{Guid.NewGuid()}{extension}";

            var path = Path.Combine(directory, name);

            int height, width = 0;
            using (var fileStream = System.IO.File.Create(path))
            {
                await mediaInputModel.Media.CopyToAsync(fileStream);

                fileStream.Seek(0, SeekOrigin.Begin);

                var optimizer = new ImageOptimizer();

                optimizer.LosslessCompress(fileStream);

                var image = new MagickImage(fileStream);

                height = image.Height;
                width = image.Width;
            }

            var authority = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            var url = $"{authority}/storage/{directory.Replace(wwwrootPath, String.Empty)}";

            var media = new Media()
            {
                Name = name,
                Url = url,
                Extension = extension,
                Height = height,
                Width = width,
                LibraryId = library.Id
            };

            _unitOfWork.MediaRepository.Add(media);
            await _unitOfWork.CompleteAsync();

            return this.Created($"{authority}/api/media/{media.Id}", MediaOutputModel.FromEntity(media));
        }
    }
}
