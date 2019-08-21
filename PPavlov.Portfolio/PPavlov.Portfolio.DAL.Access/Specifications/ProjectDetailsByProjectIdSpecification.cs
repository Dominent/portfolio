using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access.Specifications
{
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