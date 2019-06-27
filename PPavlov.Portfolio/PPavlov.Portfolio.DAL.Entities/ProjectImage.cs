using PPavlov.Portfolio.DAL.Contracts;
using System.ComponentModel.DataAnnotations;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class ProjectImage : IEntity<int>
    {
        [Key]
        public int Id { get; set; }

        public string ImagePath { get; set; }

        public string ImageAlt { get; set; }
    }
}
