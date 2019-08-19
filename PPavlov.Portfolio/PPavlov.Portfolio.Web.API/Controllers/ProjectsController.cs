using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using PPavlov.Portfolio.DAL.Access;
using PPavlov.Portfolio.DAL.Entities;
using PPavlov.Portfolio.Web.API.Models.Input;
using PPavlov.Portfolio.Web.API.Models.Output;

namespace PPavlov.Portfolio.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDocumentSerializer _documentSerializer;
        private readonly IHostingEnvironment _hostingEnvironment;

        public ProjectsController(
            IUnitOfWork unitOfWork,
            IDocumentSerializer documentSerializer,
            IHostingEnvironment hostingEnvironment
        )
        {
            _unitOfWork = unitOfWork;
            _documentSerializer = documentSerializer;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> GetProjectsAsync()
        {
            var projects = await _unitOfWork.ProjectsRepository
                .GetAllAsync((p) => true);

            return this.Ok(projects.Select(x => new ProjectOutputModel
            {
                Id = x.Id,
                Title = x.Title,
                Location = x.Location,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                Ongoing = x.Ongoing
            }).ToList());
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody]ProjectInputModel inputModel)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest(ModelState);
            }

            var project = new Project()
            {
                Title = inputModel.Title,
                Location = inputModel.Location,
                StartDate = inputModel.StartDate,
                EndDate = inputModel.EndDate,
                Ongoing = inputModel.Ongoing
            };

            if (!string.IsNullOrEmpty(inputModel.Image))
            {
                var image = await UploadImage(inputModel.Image);

                project.Image = image;
            }
           
            _unitOfWork.ProjectsRepository.Add(project);

            await _unitOfWork.CompleteAsync();

            return this.Ok(project);
        }

        [HttpPost("{projectId:int}/details")]
        public async Task<IActionResult> CreateProjectDetail([FromBody]ProjectDetailInputModel inputModelModel, int projectId)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest(ModelState);
            }

            var images = (await Task.WhenAll(inputModelModel.Images
                .Select(x => UploadImage(x.Value))
                .ToList()))
                .ToList();

            var tags = inputModelModel.Tags
                .Select(x => new Tag() { Name = x.Name })
                .ToList();

            var links = inputModelModel.Links
                .Select(x => new Link() { Href = x.Href, Name = x.Name })
                .ToList();

            var projectDetails = new ProjectDetail()
            {
                ProjectId = projectId,
                Description = inputModelModel.Description,
                Info = inputModelModel.Info
            };

            images
                .Select(x => new ProjectDetailImage()
                {
                    Image = x,
                    ProjectDetail = projectDetails
                })
                .ToList()
                .ForEach(x => _unitOfWork.ProjectDetailImageRepository.Add(x));

            tags
                .Select(x => new ProjectDetailTag()
                {
                    Tag = x,
                    ProjectDetail = projectDetails
                })
                .ToList()
                .ForEach(x => _unitOfWork.ProjectDetailTagRepository.Add(x));

            links
                .Select(x => new ProjectDetailLink()
                {
                    Link = x,
                    ProjectDetail = projectDetails
                })
                .ToList()
                .ForEach(x => _unitOfWork.ProjectDetailLinkRepository.Add(x));

            await _unitOfWork.CompleteAsync();

            return this.Ok(ProjectDetailsOutputModel.FromEntity(projectDetails));
        }

        [HttpGet("{projectId:int}/details")]
        public async Task<IActionResult> GetProjectDetails(int projectId)
        {
            var projectDetails = (await _unitOfWork.ProjectDetailsRepository
                    .ApplyAsync(new ProjectDetailsByProjectIdSpecification(projectId)))
                .FirstOrDefault();

            if (projectDetails == null)
            {
                return this.NotFound();
            }

            return this.Ok(ProjectDetailsOutputModel.FromEntity(projectDetails));
        }

        private async Task<Image> UploadImage([Base64]string image)
        {
            var document = _documentSerializer.Deserialize(image);

            var name = $"{Guid.NewGuid()}{document.Extension}";
            var path = Path.Combine($"{_hostingEnvironment.ContentRootPath}/wwwroot/storage");

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            await System.IO.File.WriteAllBytesAsync($"{path}/{name}", document.Buffer);

            var authority = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";

            return new Image()
            {
                ImagePath = $"{authority}/storage/{name}"
            };
        }
    }

    public class ProjectDetailsByProjectIdSpecification : BaseSpecification<ProjectDetail, int>
    {
        public ProjectDetailsByProjectIdSpecification(int projectId)
            : base(x => x.ProjectId == projectId)
        {
            this.AddIncludeString(nameof(ProjectDetail.ProjectDetailImages), nameof(ProjectDetailImage.Image));
            this.AddIncludeString(nameof(ProjectDetail.ProjectDetailLinks), nameof(ProjectDetailLink.Link));
            this.AddIncludeString(nameof(ProjectDetail.ProjectDetailTags), nameof(ProjectDetailTag.Tag));
        }
    }
}
