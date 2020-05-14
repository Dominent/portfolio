﻿using Microsoft.AspNetCore.Mvc;
using PPavlov.Portfolio.Web.API.Models.Input;
using PPavlov.Portfolio.Web.API.Models.Output;
using PPavlov.Portfolio.Web.API.Services;
using System.Threading.Tasks;

namespace PPavlov.Portfolio.Web.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : ControllerBase
    {
        private readonly IUploadImageService _uploadImageService;

        public ImagesController(
            IUploadImageService uploadImageService
        )
        {
            _uploadImageService = uploadImageService;
        }

        [HttpPost(nameof(ImagesController.Upload))]
        public async Task<IActionResult> Upload([FromBody]ImageInputModel inputModel)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest(ModelState);
            }

            var image = await _uploadImageService.UploadImage(inputModel.Value);

            return this.Ok(ImageOutputModel.FromEntity(image));
        }
    }
}