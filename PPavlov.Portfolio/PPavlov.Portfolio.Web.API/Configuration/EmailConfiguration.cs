using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PPavlov.Portfolio.Web.API.Configuration
{
    public class EmailConfiguration
    {
        public class CredentialsConfiguration
        {
            public class LoginConfiguration
            {
                public string Username { get; set; }

                public string Password { get; set; }
            }

            public LoginConfiguration Sender { get; set; }
        }

        public class PortConfiguration
        {
            public int SMTP { get; set; }
        }

        public class HostConfiguration
        {
            public string SMTP { get; set; }
        }

        public bool IsHtmlEmail { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public CredentialsConfiguration Credentials { get; set; }

        public PortConfiguration Port { get; set; }

        public HostConfiguration Host { get; set; }
    }
}
