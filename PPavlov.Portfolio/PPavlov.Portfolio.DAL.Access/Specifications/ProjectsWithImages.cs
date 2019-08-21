using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access.Specifications
{
    public class ProjectsWithImages : BaseSpecification<Project, int>
    {
        public ProjectsWithImages()
            : base(x => true)
        {
            AddInclude(x => x.Image);
        }
    }
}