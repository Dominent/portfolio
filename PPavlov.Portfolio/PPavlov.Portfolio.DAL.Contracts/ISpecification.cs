using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace PPavlov.Portfolio.DAL.Contracts
{
    public interface ISpecification<TEntity, TKey> 
        where TEntity : IEntity<TKey>
    {
        Expression<Func<TEntity, bool>> Criteria { get; }

        List<Expression<Func<TEntity, object>>> Includes { get; }

        List<string> IncludeStrings { get; }
    }
}
