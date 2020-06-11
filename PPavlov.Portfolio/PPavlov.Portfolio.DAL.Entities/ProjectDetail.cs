using PPavlov.Portfolio.DAL.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class ProjectDetail: IEntity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public string Info { get; set; }

        public string Description { get; set; }

        [ForeignKey(nameof(ProjectId))]
        public virtual Project Project { get; set; }

        public virtual IEnumerable<ProjectDetailImage> ProjectDetailImages { get; set; }

        public virtual IEnumerable<ProjectDetailLink> ProjectDetailLinks { get; set; }

        public virtual IEnumerable<ProjectDetailTag> ProjectDetailTags { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
