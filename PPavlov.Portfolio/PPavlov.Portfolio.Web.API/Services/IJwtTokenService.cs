using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.Web.API.Services
{
    public interface IJwtTokenService
    {
        JwtAuthToken Generate(User user);
    }
}