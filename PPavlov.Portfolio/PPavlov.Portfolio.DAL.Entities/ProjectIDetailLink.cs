using System.ComponentModel.DataAnnotations.Schema;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class ProjectDetailLink
    {
        public int ProjectDetailId { get; set; }

        public int ProjectLinkId { get; set; }

        [ForeignKey(nameof(ProjectDetailId))]
        public virtual ProjectDetail ProjectDetail { get; set; }

        [ForeignKey(nameof(ProjectLinkId))]
        public virtual ProjectLink ProjectLink { get; set; }
    }
}
