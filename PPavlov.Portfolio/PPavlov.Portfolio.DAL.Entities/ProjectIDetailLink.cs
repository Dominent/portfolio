using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PPavlov.Portfolio.DAL.Contracts;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class ProjectDetailLink : IEntity<int>
    {
        [Key]
        public int Id { get; set; }

        public int ProjectDetailId { get; set; }

        public int ProjectLinkId { get; set; }

        [ForeignKey(nameof(ProjectDetailId))]
        public virtual ProjectDetail ProjectDetail { get; set; }

        [ForeignKey(nameof(ProjectLinkId))]
        public virtual Link Link { get; set; }
    }
}
