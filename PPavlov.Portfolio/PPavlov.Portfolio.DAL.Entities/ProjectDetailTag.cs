using System.ComponentModel.DataAnnotations.Schema;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class ProjectDetailTag
    {
        public int ProjectDetailId { get; set; }

        public int ProjectTagId { get; set; }

        [ForeignKey(nameof(ProjectDetailId))]
        public virtual ProjectDetail ProjectDetail { get; set; }

        [ForeignKey(nameof(ProjectTagId))]
        public virtual ProjectTag ProjectTag { get; set; }
    }
}
