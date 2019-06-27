using PPavlov.Portfolio.DAL.Contracts;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class ProjectDetail: IEntity<int>
    {
        [Key]
        public int Id { get; set; }

        public string Info { get; set; }

        public string Description { get; set; }

        public virtual IEnumerable<ProjectDetailImage> ProjectDetailImages { get; set; }

        public virtual IEnumerable<ProjectDetailLink> ProjectDetailLinks { get; set; }

        public virtual IEnumerable<ProjectDetailTag> ProjectDetailTags { get; set; }
    }
}
