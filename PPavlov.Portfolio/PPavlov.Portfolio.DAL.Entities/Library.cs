using PPavlov.Portfolio.DAL.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class Library : IEntity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }

        public int? ParentId { get; set; }

        [ForeignKey(nameof(ParentId))]
        public Library Parent { get; set; }

        public IEnumerable<Media> Media { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
