using MimeTypes;
using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace PPavlov.Portfolio.Web.API.Controllers
{
    public class Base64DocumentSerializer : IDocumentSerializer
    {
        private const string Base64FormatPattern = @"(?!data:)([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);(\w+),";
        private const string Base64Encoding = "base64";

        public Document Deserialize([Base64]string document)
        {
            var matches = Regex.Matches(document, Base64FormatPattern);

            var mimeType = matches.First().Groups[1].ToString();
            var encoding = matches.First().Groups[2].ToString();

            document = document.Replace($"data:{mimeType};{encoding},", String.Empty);

            var extension = MimeTypeMap.GetExtension(mimeType);

            var buffer = Convert.FromBase64String(document);

            return new Document()
            {
                Buffer = buffer,
                Extension = extension
            };
        }

        public string Serialize(Document document)
        {
            var mimeType = MimeTypeMap.GetMimeType(document.Extension);
            var base64Document = Convert.ToBase64String(document.Buffer);

            return $"data:{mimeType};{Base64Encoding},{base64Document}";
        }
    }
}
