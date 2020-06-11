using System;
using System.Linq.Expressions;
using PPavlov.Portfolio.DAL.Entities;

namespace PPavlov.Portfolio.DAL.Access.Specifications
{
    public class LibraryWithMediaSpecification : BaseSpecification<Library, int>
    {
        public LibraryWithMediaSpecification() 
            : base(_ => true)
        {
            AddInclude(x => x.Media);
        }
    }
}