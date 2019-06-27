using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PPavlov.Portfolio.DAL.Access;
using PPavlov.Portfolio.DAL.Contracts;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ValuesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            //_unitOfWork.ProjectDetailsRepository
            //    .ApplyAsync(new GetProjectDetailByIdFull(id));

            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
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
