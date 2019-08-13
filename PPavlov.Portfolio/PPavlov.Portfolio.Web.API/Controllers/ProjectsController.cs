using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PPavlov.Portfolio.DAL.Access;
using PPavlov.Portfolio.DAL.Contracts;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProjectsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetProjectsAsync()
        {
            var projects = await _unitOfWork.ProjectsRepository.GetAllAsync((p) => true);

            return this.Ok(projects);
        }
    }

    public class GetProjectDetailByIdFull : BaseSpecification<ProjectDetail, int>
    {
        public GetProjectDetailByIdFull(int projectDetailId)
            : base(x => x.Id == projectDetailId)
        {
            AddInclude(x => x.ProjectDetailImages);
            AddInclude(x => x.ProjectDetailTags);
            AddInclude(x => x.ProjectDetailLinks);

            AddIncludeString(
                nameof(ProjectDetail.ProjectDetailImages),
                nameof(ProjectDetailImage.ProjectImage));

            AddIncludeString(
                nameof(ProjectDetail.ProjectDetailTags),
                nameof(ProjectDetailTag.ProjectTag));

            AddIncludeString(
                nameof(ProjectDetail.ProjectDetailLinks),
                nameof(ProjectDetailLink.ProjectLink));
        }
    }
}
