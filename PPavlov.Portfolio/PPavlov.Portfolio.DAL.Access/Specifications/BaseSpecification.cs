using PPavlov.Portfolio.DAL.Contracts;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace PPavlov.Portfolio.DAL.Access
{
    public abstract class BaseSpecification<TEntity, TKey> : ISpecification<TEntity, TKey>
          where TEntity : class, IEntity<TKey>
    {
        public BaseSpecification(Expression<Func<TEntity, bool>> criteria)
        {
            Criteria = criteria;
        }

        public Expression<Func<TEntity, bool>> Criteria { get; }

        public List<Expression<Func<TEntity, object>>> Includes { get; } =
            new List<Expression<Func<TEntity, object>>>();

        public List<string> IncludeStrings { get; } =
            new List<string>();

        protected virtual void AddInclude(Expression<Func<TEntity, object>> include)
        {
            Includes.Add(include);
        }

        protected virtual void AddIncludeString(params string[] includes)
        {
            IncludeStrings.Add(String.Join(".", includes));
        }
    }
}
