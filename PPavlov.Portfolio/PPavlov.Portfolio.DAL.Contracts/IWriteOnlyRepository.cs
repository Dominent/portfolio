namespace PPavlov.Portfolio.DAL.Contracts
{
    public interface IWriteOnlyRepository<in TEntity, TKey>
        where TEntity : IEntity<TKey>
    {
        void Add(TEntity entity);

        void Remove(TEntity entity);

        void Update(TEntity entity);
    }
}
