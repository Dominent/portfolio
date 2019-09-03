using System.Linq;
using Microsoft.EntityFrameworkCore;
using PPavlov.Portfolio.DAL.Contracts;

namespace PPavlov.Portfolio.DAL.Access.Specifications
{
    public class SpecificationEvaluator<TEntity, TKey> 
        where TEntity : class, IEntity<TKey>
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery,
            ISpecification<TEntity, TKey> specification)
        {
            var query = inputQuery;

            if (specification.Criteria != null)
            {
                query = query.Where(specification.Criteria);
            }

            if (specification.Includes.Any())
            {
                query = specification.Includes.Aggregate(query,
                    (current, include) => current.Include(include));
            }

            if (specification.IncludeStrings.Any())
            {
                query = specification.IncludeStrings.Aggregate(query,
                 (current, include) => current.Include(include));
            }

            return query;
        }
    }
}
