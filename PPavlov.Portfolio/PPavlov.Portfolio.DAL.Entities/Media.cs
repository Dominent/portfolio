using PPavlov.Portfolio.DAL.Contracts;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class Media : IEntity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Extension { get; set; }

        public string Url { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }

        public int LibraryId { get; set; }

        [ForeignKey(nameof(LibraryId))]
        public Library Library { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
