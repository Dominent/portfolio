using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PPavlov.Portfolio.DAL.Contracts;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class ProjectDetailTag :IEntity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int ProjectDetailId { get; set; }

        public int TagId { get; set; }

        [ForeignKey(nameof(ProjectDetailId))]
        public virtual ProjectDetail ProjectDetail { get; set; }

        [ForeignKey(nameof(TagId))]
        public virtual Tag Tag { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
