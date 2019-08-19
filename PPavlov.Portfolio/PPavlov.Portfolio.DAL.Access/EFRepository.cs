using Microsoft.EntityFrameworkCore;
using PPavlov.Portfolio.DAL.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace PPavlov.Portfolio.DAL.Access
{
    public class EFRepository<TEntity, TKey> : IRepository<TEntity, TKey>
        where TEntity : class, IEntity<TKey>
    {
        private readonly DbContext _context;

        public EFRepository(DbContext context)
        {
            _context = context;
        }

        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _context.Set<TEntity>().FirstOrDefaultAsync(predicate);
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await (_context.Set<TEntity>().Where(predicate)).ToListAsync();
        }

        public async Task<TEntity> GetByIdAsync(TKey id)
        {
            return await _context.Set<TEntity>().FindAsync(id);
        }

        public void Add(TEntity entity)
        {
            _context.Set<TEntity>()
               .Attach(entity)
               .State = EntityState.Added;
        }

        public void Remove(TEntity entity)
        {
            _context.Set<TEntity>()
               .Attach(entity)
               .State = EntityState.Deleted;
        }

        public void Update(TEntity entity)
        {
            _context.Set<TEntity>()
                .Attach(entity)
                .State = EntityState.Modified;
        }

        public async Task<IEnumerable<TEntity>> ApplyAsync(ISpecification<TEntity, TKey> specification)
        {
            return await SpecificationEvaluator<TEntity, TKey>
                .GetQuery(_context.Set<TEntity>().AsQueryable(), specification)
                .ToListAsync();
        }
    }
}
