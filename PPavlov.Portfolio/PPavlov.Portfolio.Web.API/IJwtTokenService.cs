using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.Web.API
{
    public interface IJwtTokenService
    {
        JWTAuthToken Generate(User user);
    }
}