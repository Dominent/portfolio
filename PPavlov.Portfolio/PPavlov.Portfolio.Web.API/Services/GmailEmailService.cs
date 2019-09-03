using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using PPavlov.Portfolio.Web.API.Configuration;

namespace PPavlov.Portfolio.Web.API.Services
{
    public class GmailEmailService : IEmailService
    {
        private readonly EmailConfiguration _emailConfiguration;

        public GmailEmailService(IOptions<EmailConfiguration> emailConfiguration)
        {
            _emailConfiguration = emailConfiguration.Value;
        }

        public async Task SendAsync(string to, string subject, string body)
        {
            var message = new MimeMessage();

            message.From.Add(new MailboxAddress(_emailConfiguration.From));
            message.To.Add(new MailboxAddress(to));

            message.Subject = subject;

            message.Body = new TextPart(_emailConfiguration.IsHtmlEmail ?
                    TextFormat.Html :
                    TextFormat.Text
            )
            { Text = body };

            using (var smtpClient = new SmtpClient())
            {
                await smtpClient.ConnectAsync(_emailConfiguration.Host.SMTP, _emailConfiguration.Port.SMTP,
                        SecureSocketOptions.StartTls);

                await smtpClient.AuthenticateAsync(
                    _emailConfiguration.Credentials.Sender.Username,
                    _emailConfiguration.Credentials.Sender.Password);

                await smtpClient.SendAsync(message);

                await smtpClient.DisconnectAsync(true);
            }
        }
    }
}
