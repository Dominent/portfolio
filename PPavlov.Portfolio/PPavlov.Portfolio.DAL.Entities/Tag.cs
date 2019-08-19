using PPavlov.Portfolio.DAL.Contracts;
using System.ComponentModel.DataAnnotations;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class Tag : IEntity<int>
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
