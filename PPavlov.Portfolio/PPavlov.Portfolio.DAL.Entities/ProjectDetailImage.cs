using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class ProjectDetailImage
    {
        public int ProjectDetailId { get; set; }

        public int ProjectImageId { get; set; }

        [ForeignKey(nameof(ProjectDetailId))]
        public virtual ProjectDetail ProjectDetail { get; set; }

        [ForeignKey(nameof(ProjectImageId))]
        public virtual ProjectImage ProjectImage { get; set; }
    }
}
