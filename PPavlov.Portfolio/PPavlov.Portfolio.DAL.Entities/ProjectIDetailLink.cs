using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PPavlov.Portfolio.DAL.Contracts;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class ProjectDetailLink : IEntity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int ProjectDetailId { get; set; }

        public int LinkId { get; set; }

        [ForeignKey(nameof(ProjectDetailId))]
        public virtual ProjectDetail ProjectDetail { get; set; }

        [ForeignKey(nameof(LinkId))]
        public virtual Link Link { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
