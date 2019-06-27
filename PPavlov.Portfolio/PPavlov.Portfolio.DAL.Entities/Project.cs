using PPavlov.Portfolio.DAL.Contracts;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class Project: IEntity<int>
    {
        [Key]
        public int Id { get; set; }

        public int ProjectDetailId { get; set; }

        public int ProjectImageId { get; set; }

        public string Header { get; set; }

        [ForeignKey(nameof(ProjectDetailId))]
        public virtual ProjectDetail ProjectDetail { get; set; }

        [ForeignKey(nameof(ProjectImageId))]
        public virtual ProjectImage ProjectImage { get; set; }
    }
}
