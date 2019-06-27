using Microsoft.AspNetCore.Identity;
using PPavlov.Portfolio.DAL.Contracts;
using System.ComponentModel.DataAnnotations;

namespace PPavlov.Portfolio.DAL.Entities
{
    public class User : IdentityUser, 
        IEntity<string>
    {
    }
}
