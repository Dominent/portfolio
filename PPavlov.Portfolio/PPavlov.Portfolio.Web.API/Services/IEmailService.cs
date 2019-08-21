using System.Threading.Tasks;

namespace PPavlov.Portfolio.Web.API.Services
{
    public interface IEmailService
    {
        Task SendAsync(string to, string subject, string body);
    }
}