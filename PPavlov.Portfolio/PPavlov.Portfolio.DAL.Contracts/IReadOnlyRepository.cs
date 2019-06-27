using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace PPavlov.Portfolio.DAL.Contracts
{
    public interface IReadOnlyRepository<TEntity, TKey>
        where TEntity : IEntity<TKey>
    {
        Task<IEnumerable<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> predicate);

        Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate);

        Task<TEntity> GetByIdAsync(TKey id);

        Task<IEnumerable<TEntity>> ApplyAsync(ISpecification<TEntity, TKey> specification);
    }
}
