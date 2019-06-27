using PPavlov.Portfolio.DAL.Contracts;
using System.ComponentModel.DataAnnotations;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class ProjectLink : IEntity<int>
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Href { get; set; }
    }
}
