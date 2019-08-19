using PPavlov.Portfolio.DAL.Contracts;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class Project: IEntity<int>
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Location { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public bool Ongoing { get; set; }

        public int? ProjectDetailId { get; set; }

        public int? ProjectImageId { get; set; }

        [ForeignKey(nameof(ProjectDetailId))]
        public virtual ProjectDetail ProjectDetail { get; set; }

        [ForeignKey(nameof(ProjectImageId))]
        public virtual ProjectImage ProjectImage { get; set; }
    }
}
