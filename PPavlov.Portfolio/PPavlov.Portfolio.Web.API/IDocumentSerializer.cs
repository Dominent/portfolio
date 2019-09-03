namespace PPavlov.Portfolio.Web.API.Controllers
{
    public interface IDocumentSerializer
    {
        string Serialize(Document document);

        Document Deserialize([Base64]string document);
    }
}
