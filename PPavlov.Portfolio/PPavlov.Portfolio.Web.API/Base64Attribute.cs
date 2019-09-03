using System;

namespace PPavlov.Portfolio.Web.API.Controllers
{
    //TODO(PPavlov): Add Format Validation
    //data:[<mime type>][;charset=<charset>][;base64],<encoded data>
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
    public class Base64Attribute : Attribute
    {
    }
}
