using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.Web.API
{
    public interface IJwtTokenService
    {
        JwtAuthToken Generate(User user);
    }
}