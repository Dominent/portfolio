using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PPavlov.Portfolio.DAL.Contracts;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class ProjectDetailTag :IEntity<int>
    {
        [Key]
        public int Id { get; set; }

        public int ProjectDetailId { get; set; }

        public int ProjectTagId { get; set; }

        [ForeignKey(nameof(ProjectDetailId))]
        public virtual ProjectDetail ProjectDetail { get; set; }

        [ForeignKey(nameof(ProjectTagId))]
        public virtual Tag Tag { get; set; }
    }
}
