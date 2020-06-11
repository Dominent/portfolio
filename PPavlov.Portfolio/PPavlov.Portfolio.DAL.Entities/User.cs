using Microsoft.AspNetCore.Identity;
using PPavlov.Portfolio.DAL.Contracts;
using System;
using System.ComponentModel.DataAnnotations;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class User : IdentityUser,
        IEntity<string>
    {
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
